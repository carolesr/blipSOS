#include <TinyGPS++.h>

TinyGPSPlus _gps;
HardwareSerial _serial_gps(GPS_SERIAL_NUM);
uint32_t LatitudeBinary;
uint32_t LongitudeBinary;
uint16_t altitudeGps;
uint8_t hdopGps;
uint8_t sats;
char t[32];

void gps_setup() {
    _serial_gps.begin(GPS_BAUDRATE, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);
}

void gps_loop() {
    if (_serial_gps.available() > 0) {
        gpsValid = true;
        if (_gps.encode(_serial_gps.read()))
            displayInfo();
    }

    if (millis() > 5000 && _gps.charsProcessed() < 10) {
        Serial.println(F("No GPS detected: check wiring."));
    }
}

void buildPacket(uint8_t txBuffer[10])
{
    LatitudeBinary = ((_gps.location.lat() + 90) / 180.0) * 16777215;
    LongitudeBinary = ((_gps.location.lng() + 180) / 360.0) * 16777215;
    altitudeGps = _gps.altitude.meters();
    hdopGps = _gps.hdop.value() / 10;
    sats = _gps.satellites.value();

    sprintf(t, "Lat: %f", _gps.location.lat());
    Serial.println(t);
    sprintf(t, "Lng: %f", _gps.location.lng());
    Serial.println(t);
    sprintf(t, "Alt: %d", altitudeGps);
    Serial.println(t);
    sprintf(t, "Hdop: %d", hdopGps);
    Serial.println(t);
    sprintf(t, "Sats: %d", sats);
    Serial.println(t);

    txBuffer[0] = ( LatitudeBinary >> 16 ) & 0xFF;
    txBuffer[1] = ( LatitudeBinary >> 8 ) & 0xFF;
    txBuffer[2] = LatitudeBinary & 0xFF;
    txBuffer[3] = ( LongitudeBinary >> 16 ) & 0xFF;
    txBuffer[4] = ( LongitudeBinary >> 8 ) & 0xFF;
    txBuffer[5] = LongitudeBinary & 0xFF;
    txBuffer[6] = ( altitudeGps >> 8 ) & 0xFF;
    txBuffer[7] = altitudeGps & 0xFF;
    txBuffer[8] = hdopGps & 0xFF;
    txBuffer[9] = sats & 0xFF;
}


void displayInfo()
{
    Serial.print("gps.location.isValid(): ");
    Serial.println(_gps.location.isValid());

    Serial.print(F("Location: "));
    if (_gps.location.isValid()) {
        Serial.print(_gps.location.lat(), 6);
        Serial.print(F(","));
        Serial.print(_gps.location.lng(), 6);
    } else {
        Serial.print(F("INVALID"));
    }

    Serial.print(F("  Date/Time: "));
    if (_gps.date.isValid()) {
        Serial.print(_gps.date.month());
        Serial.print(F("/"));
        Serial.print(_gps.date.day());
        Serial.print(F("/"));
        Serial.print(_gps.date.year());
    } else {
        Serial.print(F("INVALID"));
    }

    Serial.print(F(" "));
    if (_gps.time.isValid()) {
        if (_gps.time.hour() < 10) Serial.print(F("0"));
        Serial.print(_gps.time.hour());
        Serial.print(F(":"));
        if (_gps.time.minute() < 10) Serial.print(F("0"));
        Serial.print(_gps.time.minute());
        Serial.print(F(":"));
        if (_gps.time.second() < 10) Serial.print(F("0"));
        Serial.print(_gps.time.second());
        Serial.print(F("."));
        if (_gps.time.centisecond() < 10) Serial.print(F("0"));
        Serial.print(_gps.time.centisecond());
    } else {
        Serial.print(F("INVALID"));
    }

    Serial.println();
}
