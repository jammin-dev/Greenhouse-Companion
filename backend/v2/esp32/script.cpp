#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <DHT.h>

// WiFi credentials
const char *ssid = "***REMOVED***";
const char *password = "***REMOVED***";

// Server URL for sending sensor data
const char *serverUrl = "https://walrus-app-jbfmz.ondigitalocean.app/sensors";

// Name for the ESP32 device
const char *esp32Name = "ESP32";

// GPIO PINS for smart plugs
#define SMART_PLUG_1 26
#define SMART_PLUG_2 27
#define SMART_PLUG_3 14
#define SMART_PLUG_4 12

// DHT Sensor configuration
#define DHTPIN 33
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Arrays to store timing information for each smart plug
unsigned long setMillis[4] = {0};
unsigned long currentMillis[4] = {0};
bool timerActive[4] = {false};
int smartPlugPins[] = {
    SMART_PLUG_1,
    SMART_PLUG_2,
    SMART_PLUG_3,
    SMART_PLUG_4};

void setup()
{
    Serial.begin(115200);

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    // Initialize smart plug pins
    pinMode(SMART_PLUG_1, OUTPUT);
    pinMode(SMART_PLUG_2, OUTPUT);
    pinMode(SMART_PLUG_3, OUTPUT);
    pinMode(SMART_PLUG_4, OUTPUT);

    // Initialize DHT sensor
    dht.begin();
}

void loop()
{
    // Check timers for each smart plug
    for (int i = 0; i < 4; i++)
    {
        if (timerActive[i] && (millis() - currentMillis[i] >= setMillis[i]))
        {
            // Time is due, turn off the smart plug
            digitalWrite(smartPlugPins[i], LOW);
            timerActive[i] = false;
        }
    }

    // Read values from DHT sensor
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    // Create a JSON document
    StaticJsonDocument<200> jsonDocument;
    jsonDocument["air_temperature"] = String(temperature, 1);
    jsonDocument["air_humidity"] = String(humidity, 0);
    jsonDocument["luminosity"] = "3500"; // Placeholder value for luminosity

    // Serialize the JSON document to a string
    String jsonString;
    serializeJson(jsonDocument, jsonString);
    Serial.print("Values sent: ");
    Serial.println(jsonString);

    // Create an HTTPClient object
    HTTPClient http;

    // Send the POST request
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(jsonString);

    if (httpCode > 0)
    {
        // Successful HTTP request
        String response = http.getString();
        Serial.print("Action required: ");
        Serial.println(response);

        // Parse the JSON response
        DynamicJsonDocument jsonDoc(400);
        DeserializationError jsonResponse = deserializeJson(jsonDoc, response);

        if (!jsonResponse)
        {
            // Update smart plug timers based on JSON response
            int smartPlugTimers[] = {
                jsonDoc["smart_plug_1_timer"],
                jsonDoc["smart_plug_2_timer"],
                jsonDoc["smart_plug_3_timer"],
                jsonDoc["smart_plug_4_timer"]};

            for (int i = 0; i < 4; i++)
            {
                if (smartPlugTimers[i] != 0)
                {
                    // Set the timer and activate the smart plug
                    setMillis[i] = smartPlugTimers[i];
                    currentMillis[i] = millis();
                    timerActive[i] = true;
                    digitalWrite(smartPlugPins[i], HIGH);
                }
            }
        }
        else
        {
            Serial.println("Error parsing JSON");
        }
    }
    else
    {
        // Error on HTTP request
        Serial.println("Error on HTTP request");
    }

    // End HTTP communication
    http.end();

    // Delay before the next iteration
    delay(10000);
}
