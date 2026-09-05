#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>

const char *ssid = "YOUR_WIFI_SSID";         // set your Wi-Fi SSID
const char *password = "YOUR_WIFI_PASSWORD"; // set your Wi-Fi password
const char *serverUrl = "http://<server-host>:5001/api/sensors"; // set your server's URL
const char *esp32Name = "ESP32";

// GPIO PINS
#define SOIL_SENSOR_LEFT 32
#define SOIL_SENSOR_MIDDLE 33
#define SOIL_SENSOR_RIGHT 35

#define WATER_PUMP_LEFT 27
#define WATER_PUMP_MIDDLE 3
#define WATER_PUMP_RIGHT 22

#define AIR_SENSOR 20
#define WATER_LEVEL_SENSOR 21
#define RGB_LED 13
#define BUTTON 23
#define LUMINOSITY_SENSOR 34

#define GREEN_LED 19
#define BLUE_LED 18
#define YELLOW_LED 16
#define RED_LED 17

bool pumpsOpen = false; // Variable to track if any pump is open

void setup()
{
    Serial.begin(115200);

    pinMode(GREEN_LED, OUTPUT);
    pinMode(BLUE_LED, OUTPUT);
    pinMode(YELLOW_LED, OUTPUT);
    pinMode(RED_LED, OUTPUT);

    digitalWrite(GREEN_LED, HIGH);

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
    digitalWrite(BLUE_LED, HIGH);
}

void loop()
{
    // Read values from sensors
    int soilMoistureLeft = analogRead(SOIL_SENSOR_LEFT);
    int soilMoistureMiddle = analogRead(SOIL_SENSOR_MIDDLE);
    int soilMoistureRight = analogRead(SOIL_SENSOR_RIGHT);
    int airTemperature = analogRead(AIR_SENSOR);
    int airHumidity = analogRead(AIR_SENSOR);
    int waterLevel = analogRead(WATER_LEVEL_SENSOR);
    int luminosity = analogRead(LUMINOSITY_SENSOR);

    // Create a JSON document key same column database
    StaticJsonDocument<200> jsonDocument;
    jsonDocument["soil_humidity_1"] = soilMoistureLeft;
    jsonDocument["soil_humidity_2"] = soilMoistureMiddle;
    jsonDocument["soil_humidity_3"] = soilMoistureRight;
    jsonDocument["air_temperature"] = airTemperature;
    jsonDocument["air_humidity"] = airHumidity;
    jsonDocument["waterLevel"] = waterLevel;
    jsonDocument["luminosity"] = luminosity;

    // Serialize the JSON document to a string
    String jsonString;
    serializeJson(jsonDocument, jsonString);

    // Create an HTTPClient object
    HTTPClient http;

    // Send the POST request
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(jsonString);

    if (httpCode > 0)
    {
        digitalWrite(BLUE_LED, LOW);
        delay(400);
        digitalWrite(BLUE_LED, HIGH);
        delay(400);
        String response = http.getString();
        Serial.println(response);
        digitalWrite(BLUE_LED, LOW);
        delay(400);
        digitalWrite(BLUE_LED, HIGH);

        // Parse the JSON response
        DynamicJsonDocument jsonDoc(400);
        DeserializationError error = deserializeJson(jsonDoc, response);

        // Check for parsing errors
        if (!error)
        {
            // Check if the response contains "true" to activate water pumps
            bool WaterPumpLeftState = jsonDoc["WaterPumpLeftState"];
            bool WaterPumpMiddleState = jsonDoc["WaterPumpMiddleState"];
            bool WaterPumpRightState = jsonDoc["WaterPumpRightState"];

            if (WaterPumpLeftState || WaterPumpMiddleState || WaterPumpRightState)
            {
                if (WaterPumpLeftState)
                {
                    // Turn on the left water pump
                    digitalWrite(WATER_PUMP_LEFT, LOW);
                    Serial.println("Water pump left turned on");
                    pumpsOpen = true; // Set pumpsOpen to true when any pump is open
                }
                if (WaterPumpMiddleState)
                {
                    // Turn on the middle water pump
                    digitalWrite(WATER_PUMP_MIDDLE, LOW);
                    Serial.println("Water pump middle turned on");
                    pumpsOpen = true; // Set pumpsOpen to true when any pump is open
                }
                if (WaterPumpRightState)
                {
                    // Turn on the right water pump
                    digitalWrite(WATER_PUMP_RIGHT, LOW);
                    Serial.println("Water pump right turned on");
                    pumpsOpen = true; // Set pumpsOpen to true when any pump is open
                }
                // Check if any pump is open and turn on the yellow LED accordingly
                if (pumpsOpen)
                {
                    digitalWrite(YELLOW_LED, HIGH);
                }

                delay(15000);
                digitalWrite(WATER_PUMP_LEFT, HIGH);
                digitalWrite(WATER_PUMP_MIDDLE, HIGH);
                digitalWrite(WATER_PUMP_RIGHT, HIGH);

                Serial.println("Water pumps turned off");
                pumpsOpen = false; // Set pumpsOpen to false when all pumps are turned off
                digitalWrite(YELLOW_LED, LOW);
            }
        }
        else
        {
            Serial.println("Error parsing JSON");
            digitalWrite(RED_LED, HIGH);
        }

        // Separate else block for handling HTTP request error
        if (httpCode <= 0)
        {
            Serial.println("Error on HTTP request");
            digitalWrite(RED_LED, HIGH);
        }

        http.end();

        delay(10000); // Delay between readings
        digitalWrite(RED_LED, LOW);
    }
}
