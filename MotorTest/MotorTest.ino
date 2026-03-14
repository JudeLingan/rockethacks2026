int IN1 = 2;
int IN2 = 3;
int IN3 = 4;
int IN4 = 5;

void setup() {
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT); 
}

void loop() {
  // Test the motors
  MotorACW(5);
  delay(500);
  MotorACCW(5); 
  delay(500);
  MotorBCW(5);
  delay(500);
  MotorBCCW(5);
  delay(10000);
}

// Rotates motor A clockwise for time seconds
void MotorACW (int time) {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  delay(time * 1000);
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, HIGH);
}
// Rotates motor A counter-clockwise for time seconds
void MotorACCW(int time) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  delay(time * 1000);
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, HIGH);
}
// Rotates motor B clockwise for time seconds
void MotorBCW (int time) {
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  delay(time * 1000);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, HIGH);
} 
// Rotates motor B counter-clockwise for time seconds
void MotorBCCW (int time) {
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  delay(time * 1000);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, HIGH);
}