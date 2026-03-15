from gpiozero import LED
from time import sleep

leftMotorPos = LED(17)
leftMotorNeg = LED(27)
rightMotorPos = LED(22)
rightMotorNeg = LED(23)

def rightCCW():
  leftMotorPos.off()
  leftMotorNeg.on()

def rightCW():
  leftMotorPos.on()
  leftMotorNeg.off()

def leftCCW():
  rightMotorPos.off()
  rightMotorNeg.on()

def leftCW():
  rightMotorPos.on()
  rightMotorNeg.off()

def stop():
  leftMotorPos.on()
  leftMotorNeg.on()
  rightMotorPos.on()
  rightMotorNeg.on()
  sleep(1)

def forward():
  leftCW()
  rightCW()

def backward():
  leftCCW()
  rightCCW()

def left():
  leftCCW()
  rightCW()

def right():
  leftCW()
  rightCCW()

def main():
  print("Testing")
  while True:
    direction = input("")
    match direction:
      case 'w':
        forward()
      case 'a':
        left()
      case 's':
        backward()
      case 'd':
        right()
      case _:
        stop()
main()
