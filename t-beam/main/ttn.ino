#include <Preferences.h>
#include <lmic.h>

void ttn_loop() {
    os_runloop_once();
}

uint32_t ttn_get_count() {
  return count;
}

bool trySend() {
    Serial.println("trySend");
    packetSent = false;
    packetQueued = true;

    uint8_t txBuffer[10];
    buildPacket(txBuffer);

    ttn_send(txBuffer, sizeof(txBuffer), LORAWAN_PORT, false);
    return true;
}

static void ttn_set_cnt() {
    LMIC_setSeqnoUp(count);
    static uint32_t lastWriteMsec = UINT32_MAX;
    uint32_t now = millis();
    if(now < lastWriteMsec || (now - lastWriteMsec) > 5 * 60 * 1000L) {
        lastWriteMsec = now;

        Preferences p;
        if(p.begin("lora", false)) {
            p.putUInt("count", count);
            p.end();
        }
    }
}

void ttn_send(uint8_t * data, uint8_t data_size, uint8_t port, bool confirmed) {
    Serial.println("ttn_send");
    ttn_set_cnt();

    if (LMIC.opmode & OP_TXRXPEND) {
        _ttn_callback(EV_PENDING);
        return;
    }

    LMIC_setTxData2(port, data, data_size, confirmed ? 1 : 0);

    _ttn_callback(EV_QUEUED);
    count++;
}
