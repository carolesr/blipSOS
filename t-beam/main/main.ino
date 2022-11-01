#include <Arduino.h>
#include <Wire.h>
#include <vector>
#include "configuration.h"
#include "credentials.h"

static RTC_DATA_ATTR uint32_t count = 0;
std::vector<void(*)(uint8_t message)> _lmic_callbacks;

bool packetSent, packetQueued;
bool gpsValid = false;
bool pressed = false, firstClick = false, secondClick = false;
uint32_t maxPress = 1000, firstPressedAt = 0, secondPressedAt = 0;


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
    
    pinMode(BUTTON_PIN, INPUT_PULLUP);

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

bool doubleClick() {
    if (!digitalRead(BUTTON_PIN)) {
        if (!pressed) {
            pressed = true;
            if (!firstClick) {
                firstClick = true;
                firstPressedAt = millis();
            } else if (!secondClick) {
                secondClick = true;     
                secondPressedAt = millis();          
            }
        }
    }
    else if (pressed) {
        pressed = false;
        if (firstClick) {
            if ((millis() - firstPressedAt) > maxPress) {
                firstClick = false;
                secondClick = false;
                firstPressedAt = 0;
                secondPressedAt = 0;            
            }
        }
        
        if (firstClick && secondClick) {
            if ((secondPressedAt - firstPressedAt) <= maxPress) {
                firstClick = false;
                secondClick = false; 
                firstPressedAt = 0;
                secondPressedAt = 0; 
                return true;  
            }       
        }
    }
    return false;
}

void loop() {
    ttn_loop();
    gps_loop();
    if (doubleClick()) {
        if (gpsValid) {
            trySend();
        }
    }
}
