#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <DHT.h>

// WiFi credentials
const char* ssid = "***REMOVED***";
const char* password = "***REMOVED***";

// Allowed client IP address for incoming HTTP requests (change as needed)
const char* allowedIP = "192.168.1.100";

// Smart plug GPIO pins
#define SMART_PLUG_1 26
#define SMART_PLUG_2 27
#define SMART_PLUG_3 14
#define SMART_PLUG_4 12

// DHT Sensor configuration
#define DHTPIN 33
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Smart plug arrays and timer variables
unsigned long setMillis[4] = {0};
unsigned long currentMillis[4] = {0};
bool timerActive[4] = {false};
int smartPlugPins[] = { SMART_PLUG_1, SMART_PLUG_2, SMART_PLUG_3, SMART_PLUG_4 };

// Create a WebServer object on port 80
WebServer server(80);

//
// Helper function to check if the remote client IP is allowed
//
bool isAllowedClient() {
  String clientIP = server.client().remoteIP().toString();
  Serial.print("Request from: ");
  Serial.println(clientIP);
  return clientIP == String(allowedIP);
}

//
// Handler for GET /sensors:
// This returns a JSON document with the sensor values
//
void handleGetSensors() {
  if (!isAllowedClient()) {
    server.send(403, "text/plain", "Forbidden: Unauthorized IP");
    return;
  }

  // Read sensor values
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  // For demonstration purposes, using a hardcoded luminosity value.
  const char* luminosity = "3500";

  // Build JSON response
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["air_temperature"] = temperature;
  jsonDoc["air_humidity"] = humidity;
  jsonDoc["luminosity"] = luminosity;

  String jsonString;
  serializeJson(jsonDoc, jsonString);
  Serial.print("Sending sensor values: ");
  Serial.println(jsonString);

  server.send(200, "application/json", jsonString);
}

//
// Handler for POST /power:
// This endpoint receives JSON data with timer settings to activate smart plugs.
// Expected JSON format (example):
// {
//    "smart_plug_1_timer": 5000,
//    "smart_plug_2_timer": 0,
//    "smart_plug_3_timer": 10000,
//    "smart_plug_4_timer": 0
// }
// Timer values are in milliseconds
//
void handlePostPower() {
  if (!isAllowedClient()) {
    server.send(403, "text/plain", "Forbidden: Unauthorized IP");
    return;
  }
  
  // Check if a body was provided
  if (server.hasArg("plain") == false) {
    server.send(400, "text/plain", "Bad Request: Missing body");
    return;
  }
  
  String body = server.arg("plain");
  Serial.print("Received POST body: ");
  Serial.println(body);

  // Parse JSON payload
  DynamicJsonDocument jsonDoc(512);
  DeserializationError error = deserializeJson(jsonDoc, body);
  if (error) {
    Serial.print("JSON Parsing Error: ");
    Serial.println(error.c_str());
    server.send(400, "text/plain", "Bad Request: Invalid JSON");
    return;
  }

  // Update smart plug timers based on the provided JSON data
  int smartPlugTimers[4];
  smartPlugTimers[0] = jsonDoc["smart_plug_1_timer"] | 0;
  smartPlugTimers[1] = jsonDoc["smart_plug_2_timer"] | 0;
  smartPlugTimers[2] = jsonDoc["smart_plug_3_timer"] | 0;
  smartPlugTimers[3] = jsonDoc["smart_plug_4_timer"] | 0;

  for (int i = 0; i < 4; i++) {
    if (smartPlugTimers[i] > 0) {
      setMillis[i] = smartPlugTimers[i];
      currentMillis[i] = millis();
      timerActive[i] = true;
      digitalWrite(smartPlugPins[i], HIGH);
      Serial.print("Activated smart plug ");
      Serial.print(i + 1);
      Serial.print(" for ");
      Serial.print(smartPlugTimers[i]);
      Serial.println(" ms");
    }
  }

  // Respond with a JSON acknowledgment
  StaticJsonDocument<200> respDoc;
  respDoc["status"] = "Smart plugs updated";
  String respString;
  serializeJson(respDoc, respString);
  server.send(200, "application/json", respString);
}

//
// Setup function runs once at startup
//
void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi network
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Connected to WiFi. IP address: ");
  Serial.println(WiFi.localIP());

  // Initialize smart plug pins
  for (int i = 0; i < 4; i++) {
    pinMode(smartPlugPins[i], OUTPUT);
    digitalWrite(smartPlugPins[i], LOW); // Ensure they start off
  }

  // Initialize the DHT sensor
  dht.begin();

  // Set up HTTP server routes
  server.on("/sensors", HTTP_GET, handleGetSensors);
  server.on("/power", HTTP_POST, handlePostPower);
  server.begin();
  Serial.println("HTTP server started");
}

//
// The main loop checks timers and handles incoming HTTP requests
//
void loop() {
  // Check timers for each smart plug. Turn off the plug when the elapsed time exceeds the set timer.
  for (int i = 0; i < 4; i++) {
    if (timerActive[i] && (millis() - currentMillis[i] >= setMillis[i])) {
      digitalWrite(smartPlugPins[i], LOW);
      timerActive[i] = false;
      Serial.print("Smart plug ");
      Serial.print(i + 1);
      Serial.println(" turned off after timer expired");
    }
  }
  
  // Handle incoming client requests
  server.handleClient();
  
  // Short delay to keep the loop responsive
  delay(10);
}
