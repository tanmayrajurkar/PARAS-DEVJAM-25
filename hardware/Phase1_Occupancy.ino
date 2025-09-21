// Phase1_Occupancy.ino

// Define pins for Sensor 1 (Slot 1)
const int TRIG_PIN_1 = 9;
const int ECHO_PIN_1 = 10;

// Define pins for Sensor 2 (Slot 2)
const int TRIG_PIN_2 = 11;
const int ECHO_PIN_2 = 12;

// Define the distance threshold in centimeters.
// If an object is closer than this, the slot is considered occupied.
const int DISTANCE_THRESHOLD = 15;

void setup() {
  // Start serial communication for monitoring on the computer
  Serial.begin(9600);
  
  // Set Trig pins as OUTPUT (Arduino sends signals out)
  pinMode(TRIG_PIN_1, OUTPUT);
  pinMode(TRIG_PIN_2, OUTPUT);
  
  // Set Echo pins as INPUT (Arduino receives signals in)
  pinMode(ECHO_PIN_1, INPUT);
  pinMode(ECHO_PIN_2, INPUT);
}

void loop() {
  // Check Slot 1
  long distance1 = getDistance(TRIG_PIN_1, ECHO_PIN_1);
  if (distance1 < DISTANCE_THRESHOLD) {
    Serial.println("Car has been parked in slot 1");
  } else {
    Serial.println("Slot 1 is empty");
  }

  // Check Slot 2
  long distance2 = getDistance(TRIG_PIN_2, ECHO_PIN_2);
  if (distance2 < DISTANCE_THRESHOLD) {
    Serial.println("Car has been parked in slot 2");
  } else {
    Serial.println("Slot 2 is empty");
  }
  
  // Wait for half a second before the next reading
  delay(500);
}

/**
 * @brief Measures distance using an ultrasonic sensor.
 * @param trigPin The trigger pin of the sensor.
 * @param echoPin The echo pin of the sensor.
 * @return The calculated distance in centimeters.
 */
long getDistance(int trigPin, int echoPin) {
  // Send a short 10-microsecond pulse to trigger the sensor
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Read the duration of the echo pulse (how long it took for the sound to return)
  long duration = pulseIn(echoPin, HIGH);
  
  // Convert the duration into distance in centimeters
  long distance = duration * 0.034 / 2;
  
  return distance;
}