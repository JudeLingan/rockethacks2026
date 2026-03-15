import socket

SERVER_IP = "10.159.50.1"
PORT = 12345

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
  s.connect((SERVER_IP, PORT))
  print("Connection Successful!")
  s.sendall(b"Testing")
  while True:
    data = s.recv(1024)
    print(data)
