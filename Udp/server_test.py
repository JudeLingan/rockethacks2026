import socket
import time

SERVER_IP = "127.0.0.1"
PORT = 12345

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
  s.bind((SERVER_IP, PORT))
  s.listen()
  print(f"Server Listening on port {PORT}")
  conn, addr = s.accept()
  with conn:
    print(f"Connection Received from {addr}")
    for i in range(15):
      data = f"Test{i}".encode('utf-8')
      conn.sendall(data)
      time.sleep(1)