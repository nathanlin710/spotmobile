
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

void dot() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}

void dash() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}

void loop() {
  // H
  dot();
  dot();
  dot();
  dot();
  delay(1000);
  // E
  dot();
  delay(1000);
  // L
  dot();
  dash();
  dot();
  dot();
  delay(1000);
  // L
  dot();
  dash();
  dot();
  dot();
  delay(1000);
  // O
  dash();
  dash();
  dash();

  delay(3000);

  // I
  dot();
  dot();
  delay(1000);
  // M
  dash();
  dash();
  delay(1000);
  // U
  dot();
  dot();
  dash();

  delay(3000);
}
