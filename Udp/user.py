import socket

SERVER_IP = "127.0.0.1"
PORT = 12345

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
  s.connect((SERVER_IP, PORT))
  print("Connection Successful!")
  s.sendall(b"Testing\n")
  s.sendall(b"test\n")
