#define T_BEAM_V10      //same v1.1 version


#include <SPI.h>
#include <TinyGPS++.h>

TinyGPSPlus gps;

#if defined(T_BEAM_V07)
#define GPS_RX_PIN 12
#define GPS_TX_PIN 15
#define BUTTON_PIN 39
#define BUTTON_PIN_MASK GPIO_SEL_39
#elif defined(T_BEAM_V10)
#define GPS_RX_PIN 34
#define GPS_TX_PIN 12
#define BUTTON_PIN 38
#define BUTTON_PIN_MASK GPIO_SEL_38
#endif

#define I2C_SDA                     21
#define I2C_SCL                     22
#define PMU_IRQ                     35

#define RADIO_SCLK_PIN               5
#define RADIO_MISO_PIN              19
#define RADIO_MOSI_PIN              27
#define RADIO_CS_PIN                18
#define RADIO_DI0_PIN               26
#define RADIO_RST_PIN               23
#define RADIO_DIO1_PIN              33
#define RADIO_BUSY_PIN              32

#define GPS_BAND_RATE      9600

#ifdef T_BEAM_V10
#include <axp20x.h>
AXP20X_Class PMU;

bool initPMU()
{
    Wire.begin(I2C_SDA, I2C_SCL);

    if (PMU.begin(Wire, AXP192_SLAVE_ADDRESS) == AXP_FAIL) {
        return false;
    }
    /*
     * The charging indicator can be turned on or off
     * * * */
    // PMU.setChgLEDMode(LED_BLINK_4HZ);

    /*
    * The default ESP32 power supply has been turned on,
    * no need to set, please do not set it, if it is turned off,
    * it will not be able to program
    *
    *   PMU.setDCDC1Voltage(3300);
    *   PMU.setPowerOutPut(AXP192_DCDC1, AXP202_ON);
    *
    * * * */

    /*
     *   Turn off unused power sources to save power
     * **/
    PMU.setPowerOutPut(AXP192_DCDC2, AXP202_OFF);
    PMU.setPowerOutPut(AXP192_LDO2, AXP202_OFF);
    PMU.setPowerOutPut(AXP192_LDO3, AXP202_OFF);
    PMU.setPowerOutPut(AXP192_EXTEN, AXP202_OFF);

    /*
     * Set the power of LoRa and GPS module to 3.3V
     **/
    PMU.setLDO2Voltage(3300);   //LoRa VDD
    PMU.setLDO3Voltage(3300);   //GPS  VDD

    PMU.setPowerOutPut(AXP192_LDO2, AXP202_ON);
    PMU.setPowerOutPut(AXP192_LDO3, AXP202_ON);

    return true;
}

#else
#define initPMU()
#endif

void initBoard()
{
    Serial.begin(115200);
    Serial.println("initBoard");
    Serial1.begin(GPS_BAND_RATE, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);
    SPI.begin(RADIO_SCLK_PIN, RADIO_MISO_PIN, RADIO_MOSI_PIN, RADIO_CS_PIN);
    delay(50);
    if (!initPMU()) {
        Serial.println("initPMU returned false");
    }
    Serial.println("finished initBoard");
}

void displayInfo();

void setup()
{
    initBoard();
    // When the power is turned on, a delay is required.
    delay(300);

    Serial.println(F("DeviceExample.ino"));
    Serial.println(F("A simple demonstration of TinyGPS++ with an attached GPS module"));
    Serial.print(F("Testing TinyGPS++ library v. "));
    Serial.println(TinyGPSPlus::libraryVersion());
    Serial.println(F("by Mikal Hart"));
    Serial.println();
}

void loop()
{
    // This sketch displays information every time a new sentence is correctly encoded.
    while (Serial1.available() > 0)
        if (gps.encode(Serial1.read()))
            displayInfo();

    if (millis() > 5000 && gps.charsProcessed() < 10) {
        Serial.println(F("No GPS detected: check wiring."));
        while (true);
    }
}

void displayInfo()
{
    Serial.print("gps.location.isValid(): ");
    Serial.println(gps.location.isValid());
    Serial.print("gps.location.isUpdated(): ");
    Serial.println(gps.location.isUpdated());
    Serial.print("gps.satellites.value(): ");
    Serial.println(gps.satellites.value());
    Serial.print("gps.date.isValid(): ");
    Serial.println(gps.date.isValid());
    Serial.print("gps.time.isValid(): ");
    Serial.println(gps.time.isValid());
    Serial.print("gps.location.lat(): ");
    Serial.println(gps.location.lat());
    Serial.print("gps.location.lng(): ");
    Serial.println(gps.location.lng());

    Serial.print(F("Location: "));
    if (gps.location.isValid()) {
        Serial.print(gps.location.lat(), 6);
        Serial.print(F(","));
        Serial.print(gps.location.lng(), 6);
    } else {
        Serial.print(F("INVALID"));
    }

    Serial.print(F("  Date/Time: "));
    if (gps.date.isValid()) {
        Serial.print(gps.date.month());
        Serial.print(F("/"));
        Serial.print(gps.date.day());
        Serial.print(F("/"));
        Serial.print(gps.date.year());
    } else {
        Serial.print(F("INVALID"));
    }

    Serial.print(F(" "));
    if (gps.time.isValid()) {
        if (gps.time.hour() < 10) Serial.print(F("0"));
        Serial.print(gps.time.hour());
        Serial.print(F(":"));
        if (gps.time.minute() < 10) Serial.print(F("0"));
        Serial.print(gps.time.minute());
        Serial.print(F(":"));
        if (gps.time.second() < 10) Serial.print(F("0"));
        Serial.print(gps.time.second());
        Serial.print(F("."));
        if (gps.time.centisecond() < 10) Serial.print(F("0"));
        Serial.print(gps.time.centisecond());
    } else {
        Serial.print(F("INVALID"));
    }

    Serial.println();
}