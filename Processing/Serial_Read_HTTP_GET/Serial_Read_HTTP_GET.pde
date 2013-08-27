/**
 * Serial Read HTTP GET
 *
 * This file modifies two basic Processing examples to read a signal from 
 * a serial port and HTTP GET to record that signal to a database. 
 * 
 *
 * HTTP Client. 
 * 
 * Starts a network client that connects to a server on port 80,
 * sends an HTTP 1.0 GET request, and prints the results. 
 *
 * Note that this code is not necessary for simple HTTP GET request:
 * Simply calling loadStrings("http://www.processing.org") would do
 * the same thing as (and more efficiently than) this example.
 * This example is for people who might want to do something more 
 * complicated later.
 *
 * Simple Read
 * 
 * Read data from the serial port and change the color of a rectangle
 * when a switch connected to a Wiring or Arduino board is pressed and released.
 * This example works with the Wiring / Arduino program that follows below.
 *
 */
import processing.serial.*;
import processing.net.*;


Serial myPort;  // Create object from Serial class
int signal;      // Data received from the serial port

Client c; // Create a client to send and receive HTTP requests
String data; // This will hold the request data
String myHost = "andyjepkes.com";
String myURI = "/API/index.php";
String params = "?UName=Sensor";
  
String msg; // To be used in this Sketch
PFont font;

void setup() {
  size(200, 200);
  font = createFont("Georgia",34);
  textFont(font);
  
  
  
  // Set up a client to send your results to the database.
  // Note that the data gets written to the database using
  // PHP and SQL on the server side
  println (myHost + myURI + params);
  c = new Client(this, myHost, 80); // Connect to server on port 80
  c.write("GET "+myURI+params+" HTTP/1.1\n"); // Use the HTTP "GET" command to ask for a Web page
  c.write("HOST: "+myHost+"\n\n");
  
  // Set up you serial port to listen for a signal 
  String portName = Serial.list()[2];
  myPort = new Serial(this, portName, 9600);
}

void draw() {
  background(0);
  fill(200);
  text("1", 90, 90);
  
  if ( myPort.available() > 0) {  // If data is available,
    signal = myPort.read();         // read it and store it in val
    msg = "Signal high";
    c.write("GET "+myURI+params+" HTTP/1.1\n"); // Use the HTTP "GET" command to ask for a Web page
    c.write("HOST: "+myHost+"\n\n");
    delay(2000);
  } else {
    signal = 0;
    msg = "No signal";
  }
  
  if (c.available() > 0) { // If there's incoming data from the client...
    data = c.readString(); // ...then grab it and print it  
    printRequest(data);
  }
}

// Break out the  of these actions out into a function
void printRequest(String data) {
  println(data);
}

