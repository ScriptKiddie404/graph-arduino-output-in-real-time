void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(random(0, 100), DEC);
  delay(2000);
}
