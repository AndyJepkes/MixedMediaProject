/*
  DigitalReadSerial
  Reads a digital input on pin 2, prints the result to the serial monitor 
*/

//========== I/O PINs ===========
const int pushButton = 2; // Button Read
const int sensorPin = 12; // Sensor Read
const int onBoardLedPin = 13; // LED Control
const int ledPin = 11; // LED Control

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  
  //We want to read from an INPUT and write to an OUTPUT
  pinMode(pushButton, INPUT);
  pinMode(sensorPin, INPUT);
  pinMode(onBoardLedPin, OUTPUT);   
  pinMode(ledPin, OUTPUT);   
}

// the loop routine runs over and over again forever:
void loop() {
  int buttonState = _buttonState(digitalRead(pushButton));
  int sensorState = digitalRead(sensorPin);
  
  sendToSerial(sensorState);
  //Blink long enough to be noticable
  LEDBlink(sensorState, 35, 2000);
  
  delay(1); // delay in between reads for stability
}

void LEDBlink(int sState, int rate, int duration){
  if (sState == 1){
    int loopTime = rate*3;
    for (int i=0; i<duration/loopTime; i++){
      digitalWrite(onBoardLedPin, HIGH); 
      delay(rate);
      digitalWrite(onBoardLedPin, LOW); 
      digitalWrite(ledPin, HIGH); 
      delay(rate);
      digitalWrite(ledPin, LOW); 
      digitalWrite(onBoardLedPin, HIGH); 
      delay(rate);
    }
    digitalWrite(onBoardLedPin, LOW);
    digitalWrite(ledPin, LOW);
    //Delay long enough for the sensor to reset
    delay(3000); 
  }
}

int _buttonState(int b){
  if (b == 0){
    return 1;
  }else {
    return 0; 
  }
}

void sendToSerial(int x){
  if (x == 1) {
      Serial.println(1);
  }
}


