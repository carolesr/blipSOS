#include <Preferences.h>
#include <lmic.h>


void _ttn_callback(uint8_t message) {
    Serial.print("_ttn_callback: ");
    Serial.println(message);
    for (uint8_t i=0; i<_lmic_callbacks.size(); i++) {
        (_lmic_callbacks[i])(message);
    }
}

void callback(uint8_t message) {
    Serial.print("callback: ");
    Serial.println(message);
    bool ttn_joined = false;
    if (EV_JOINED == message) {
        Serial.println("EV_JOINED");
        ttn_joined = true;
    }
    if (EV_JOINING == message) {
        Serial.println("EV_JOINING");
        if (ttn_joined) {
            Serial.print("TTN joining...\n");
        } else {
            Serial.print("Joined TTN!\n");
        }
    }
    if (EV_JOIN_FAILED == message) Serial.print("TTN join failed\n");
    if (EV_REJOIN_FAILED == message) Serial.print("TTN rejoin failed\n");
    if (EV_RESET == message) Serial.print("Reset TTN connection\n");
    if (EV_LINK_DEAD == message) Serial.print("TTN link dead\n");
    if (EV_ACK == message) Serial.print("ACK received\n");
    if (EV_PENDING == message) Serial.print("Message discarded\n");
    if (EV_QUEUED == message) Serial.print("Message queued\n");

    if (EV_TXCOMPLETE == message && packetQueued) {
        Serial.print("Message sent\n");
        packetQueued = false;
        packetSent = true;
    }

    if (EV_RESPONSE == message) {
        Serial.print("[TTN] Response: ");

        size_t len = ttn_response_len();
        uint8_t data[len];
        ttn_response(data, len);

        char buffer[6];
        for (uint8_t i = 0; i < len; i++) {
            snprintf(buffer, sizeof(buffer), "%02X", data[i]);
            Serial.print(buffer);
        }
        Serial.print("\n");
    }
}

void ttn_response(uint8_t * buffer, size_t len) {
    for (uint8_t i = 0; i < LMIC.dataLen; i++) {
        buffer[i] = LMIC.frame[LMIC.dataBeg + i];
    }
}

size_t ttn_response_len() {
    return LMIC.dataLen;
}

void onEvent(ev_t event) {
    Serial.println("onEvent");
    switch(event) {
    case EV_JOINED: {
        if(!LORAWAN_ADR){
            LMIC_setLinkCheckMode(0);
        }

        Serial.println(F("EV_JOINED"));

        u4_t netid = 0;
        devaddr_t devaddr = 0;
        u1_t nwkKey[16];
        u1_t artKey[16];
        LMIC_getSessionKeys(&netid, &devaddr, nwkKey, artKey);
        Serial.print("netid: ");
        Serial.println(netid, DEC);
        Serial.print("devaddr: ");
        Serial.println(devaddr, HEX);
        Serial.print("AppSKey: ");
        for (size_t i=0; i<sizeof(artKey); ++i) {
            if (i != 0)
                Serial.print("-");
            printHex2(artKey[i]);
        }
        Serial.println("");
        Serial.print("NwkSKey: ");
        for (size_t i=0; i<sizeof(nwkKey); ++i) {
            if (i != 0)
                    Serial.print("-");
            printHex2(nwkKey[i]);
        }
        Serial.println();

        Preferences p;
        if(p.begin("lora", false)) {
            p.putUInt("netId", netid);
            p.putUInt("devAddr", devaddr);
            p.putBytes("nwkKey", nwkKey, sizeof(nwkKey));
            p.putBytes("artKey", artKey, sizeof(artKey));
            p.end();
        }
        break; }
    case EV_TXCOMPLETE:
        Serial.println(F("EV_TXCOMPLETE (inc. RX win. wait)"));
        if (LMIC.txrxFlags & TXRX_ACK) {
            Serial.println(F("Received ack"));
            _ttn_callback(EV_ACK);
        }
        if (LMIC.dataLen) {
            Serial.print(F("Data Received: "));
            Serial.write(LMIC.frame+LMIC.dataBeg, LMIC.dataLen);
            Serial.println();
            _ttn_callback(EV_RESPONSE);
        }
        break;
    default:
        break;
    }

    _ttn_callback(event);
}

static void printHex2(unsigned v) {
    v &= 0xff;
    if (v < 16)
        Serial.print('0');
    Serial.print(v, HEX);
}