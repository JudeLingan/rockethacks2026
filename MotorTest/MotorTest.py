from gpiozero import LED
from time import sleep

leftMotorPos = LED(17)
leftMotorNeg = LED(27)
rightMotorPos = LED(22)
rightMotorNeg = LED(23)

def leftCW():
  leftMotorPos.on()
  leftMotorNeg.on()

def leftCCW():
  leftMotorPos.on()
  leftMotorNeg.off()

def rightCW():
  rightMotorPos.on()
  rightMotorNeg.on()

def rightCCW():
  rightMotorPos.on()
  rightMotorNeg.off()

def stop():
  leftMotorPos.on()
  leftMotorNeg.on()
  rightMotorPos.on()
  rightMotorNeg.on()
  sleep(1)

def main():
  while True:
    leftCW()
    sleep(5)
    stop()
    leftCCW()
    sleep(5)
    stop()
    rightCW()
    sleep(5)
    stop()
    rightCCW()
    sleep(5)
    stop
    sleep(10)