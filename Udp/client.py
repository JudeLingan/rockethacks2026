import socket
import json
import threading
import time
import os

# CONFIGURATION — replace placeholders before deploying
SERVER_IP   = "0.0.0.0"        # TODO: replace with backend server's static IP
SERVER_PORT = 5005              # TODO: replace with backend server's UDP port
LISTEN_PORT = 5006              # Port this Pi listens on for incoming data
ID_FILE     = "robot_id.txt"    # Text file containing this robot's name/ID

SEND_INTERVAL      = 0.3        # seconds between telemetry sends
HEARTBEAT_INTERVAL = 1.0        # seconds between heartbeat pings
MAX_RETRIES        = 5          # how many consecutive send failures before stopping

# Shared state — written by receiver thread, read by motor/control logic
control = {
    "speed": 0.0,   # -1.0 (full reverse) to 1.0 (full forward)
    "turn":  0.0,   # -1.0 (full left)    to 1.0 (full right)
}
control_lock = threading.Lock()

stop_event = threading.Event()

def load_robot_id(path: str) -> str:
    """Read robot name/ID from a text file. Exits if file is missing."""
    if not os.path.exists(path):
        raise FileNotFoundError(f"Robot ID file '{path}' not found.\nCreate it and put your robot's name/ID on the first line.")
    with open(path, "r") as f:
        robot_id = f.readline().strip()
    if not robot_id:
        raise ValueError(f"Robot ID file '{path}' is empty.")
    return robot_id

def get_local_ip() -> str:
    """Best-effort method to get the Pi's current outbound IP address."""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect((SERVER_IP, SERVER_PORT))
            return s.getsockname()[0]
    except Exception:
        return "unknown local_ip"

# Receiver thread — listens for incoming UDP packets from the backend
def receiver(listen_port: int):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.settimeout(1.0)  # unblock periodically to check stop_event
    sock.bind(("", listen_port))
    print(f"[receiver] Listening on UDP port {listen_port}")

    while not stop_event.is_set():
        try:
            data, addr = sock.recvfrom(4096)
        except socket.timeout:
            print("Socket currently in timeout")
            continue
        except OSError:
            break

        try:
            payload = json.loads(data.decode("utf-8"))
            speed = float(payload.get("speed", 0.0))
            turn  = float(payload.get("turn",  0.0))

            # Clamp to [-1, 1]
            speed = max(-1.0, min(1.0, speed))
            turn  = max(-1.0, min(1.0, turn))

            with control_lock:
                control["speed"] = speed
                control["turn"]  = turn

            print(f"[receiver] From {addr} → speed={speed:+.2f}, turn={turn:+.2f}")

        except (json.JSONDecodeError, ValueError, KeyError) as e:
            print(f"[receiver] Bad packet from {addr}: {e}")

    sock.close()
    print("[receiver] Stopped.")


# Sender thread — sends telemetry every SEND_INTERVAL seconds
def sender(robot_id: str, send_interval: float, heartbeat_interval: float):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    consecutive_failures = 0
    last_heartbeat = 0.0

    print(f"[sender] Sending to {SERVER_IP}:{SERVER_PORT} every {send_interval}s")

    while not stop_event.is_set():
        now = time.time()
        current_ip = get_local_ip()

        # Build telemetry packet
        with control_lock:
            speed = control["speed"]
            turn  = control["turn"]

        packet = {
            "type":   "telemetry",
            "speed":  speed,
            "turn":   turn,
            "ts":     now,
        }

        # Upgrade to heartbeat if interval has elapsed
        if now - last_heartbeat >= heartbeat_interval:
            packet = {
                "type": "heartbeat",
                "id":     robot_id,
                "ip":     current_ip,
                "ts":     now,
            }
            last_heartbeat = now

        try:
            data = json.dumps(packet).encode("utf-8")
            sock.sendto(data, (SERVER_IP, SERVER_PORT))
            consecutive_failures = 0

            label = packet["type"].upper()
            print(f"[sender] {label} → {SERVER_IP}:{SERVER_PORT} | ip={current_ip} | "
                  f"speed={speed:+.2f}, turn={turn:+.2f}")

        except OSError as e:
            consecutive_failures += 1
            print(f"[sender] Send failed ({consecutive_failures}/{MAX_RETRIES}): {e}")
            if consecutive_failures >= MAX_RETRIES:
                print("[sender] Max retries reached. Stopping.")
                stop_event.set()
                break

        time.sleep(send_interval)

    sock.close()
    print("[sender] Stopped.")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    try:
        robot_id = load_robot_id(ID_FILE)
    except (FileNotFoundError, ValueError) as e:
        print(f"[error] {e}")
        raise SystemExit(1)

    print(f"[main] Robot ID: '{robot_id}'")
    print(f"[main] Local IP: {get_local_ip()}")

    recv_thread = threading.Thread(
        target=receiver,
        args=(LISTEN_PORT,),
        daemon=True,
        name="receiver",
    )
    send_thread = threading.Thread(
        target=sender,
        args=(robot_id, SEND_INTERVAL, HEARTBEAT_INTERVAL),
        daemon=True,
        name="sender",
    )

    recv_thread.start()
    send_thread.start()

    try:
        while not stop_event.is_set():
            time.sleep(0.1)
    except KeyboardInterrupt:
        print("\n[main] KeyboardInterrupt — shutting down.")
        stop_event.set()

    recv_thread.join(timeout=3)
    send_thread.join(timeout=3)
    print("[main] Clean exit.")
