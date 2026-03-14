import RPi.GPIO as GPIO
import time

# GPIO pin numbers (BCM mode) — adjust if your wiring differs
IN1 = 2
IN2 = 3
IN3 = 4
IN4 = 5

def setup():
    GPIO.setmode(GPIO.BCM)  # Use BCM GPIO numbering
    GPIO.setwarnings(False)
    GPIO.setup(IN1, GPIO.OUT)
    GPIO.setup(IN2, GPIO.OUT)
    GPIO.setup(IN3, GPIO.OUT)
    GPIO.setup(IN4, GPIO.OUT)

# Rotates motor A clockwise for `duration` seconds
def motor_a_cw(duration):
    GPIO.output(IN1, GPIO.HIGH)
    GPIO.output(IN2, GPIO.LOW)
    time.sleep(duration)
    # Brake: both HIGH
    GPIO.output(IN1, GPIO.HIGH)
    GPIO.output(IN2, GPIO.HIGH)

# Rotates motor A counter-clockwise for `duration` seconds
def motor_a_ccw(duration):
    GPIO.output(IN1, GPIO.LOW)
    GPIO.output(IN2, GPIO.HIGH)
    time.sleep(duration)
    # Brake: both HIGH
    GPIO.output(IN1, GPIO.HIGH)
    GPIO.output(IN2, GPIO.HIGH)

# Rotates motor B clockwise for `duration` seconds
def motor_b_cw(duration):
    GPIO.output(IN3, GPIO.HIGH)
    GPIO.output(IN4, GPIO.LOW)
    time.sleep(duration)
    # Brake: both HIGH
    GPIO.output(IN3, GPIO.HIGH)
    GPIO.output(IN4, GPIO.HIGH)

# Rotates motor B counter-clockwise for `duration` seconds
def motor_b_ccw(duration):
    GPIO.output(IN3, GPIO.LOW)
    GPIO.output(IN4, GPIO.HIGH)
    time.sleep(duration)
    # Brake: both HIGH
    GPIO.output(IN3, GPIO.HIGH)
    GPIO.output(IN4, GPIO.HIGH)

def loop():
    while True:
        motor_a_cw(5)
        time.sleep(0.5)
        motor_a_ccw(5)
        time.sleep(0.5)
        motor_b_cw(5)
        time.sleep(0.5)
        motor_b_ccw(5)
        time.sleep(10)

if __name__ == "__main__":
    setup()
    try:
        loop()
    except KeyboardInterrupt:
        print("Stopping...")
    finally:
        GPIO.cleanup()  # Reset all GPIO pins on exit
