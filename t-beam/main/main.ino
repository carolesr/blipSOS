#include <Arduino.h>
#include <Wire.h>
#include <vector>
#include "configuration.h"
#include "credentials.h"

static RTC_DATA_ATTR uint32_t count = 0;
std::vector<void(*)(uint8_t message)> _lmic_callbacks;
bool packetSent, packetQueued;
bool gpsValid = false;

void os_getArtEui (u1_t* buf) { memcpy_P(buf, APPEUI, 8); }
void os_getDevEui (u1_t* buf) { memcpy(buf, DEVEUI, 8); }
void os_getDevKey (u1_t* buf) { memcpy_P(buf, APPKEY, 16); }

void setup() {
    Serial.begin(115200);
    delay(5000);
    Serial.println("SETUP");

    Wire.begin(I2C_SDA, I2C_SCL);
    scanI2Cdevice();
    axp192Init();

    gps_setup();

    if (!ttn_setup()) {
        Serial.println("[ERR] Radio module not found!\n");
    }
    else {
        ttn_register(callback);
        ttn_join();
        ttn_adr(LORAWAN_ADR);
    }
}

void loop() {
    ttn_loop();
    gps_loop();

    if (gpsValid) {
        static uint32_t last = 0;
        if (0 == last || millis() - last > SEND_INTERVAL) {
            trySend();
            last = millis();
            Serial.println("TRANSMITTED");
        }
    }
    else
        Serial.println("GPS not valid yet");
}
