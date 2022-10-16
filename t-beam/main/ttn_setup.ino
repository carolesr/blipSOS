
#include <lmic.h>
#include <hal/hal.h>
#include <Preferences.h>

const lmic_pinmap lmic_pins = {
    .nss = NSS_GPIO,
    .rxtx = LMIC_UNUSED_PIN,
    .rst = RESET_GPIO,
    .dio = {DIO0_GPIO, DIO1_GPIO, DIO2_GPIO},
};

static void initCount() {
  if(count == 0) {
    Preferences p;
    if(p.begin("lora", true)) {
        count = p.getUInt("count", 0);
        p.end();
    }
  }
}

void initDevEUI() {
    bool needInit = true;
    for(int i = 0; i < sizeof(DEVEUI); i++)
        if(DEVEUI[i]) needInit = false;

    if(needInit)
        gen_lora_deveui(DEVEUI);
}

void gen_lora_deveui(uint8_t *pdeveui) {
    uint8_t *p = pdeveui, dmac[6];
    int i = 0;
    esp_efuse_mac_get_default(dmac);
    *p++ = 0xFF;
    *p++ = 0xFE;
    for (i = 0; i < 6; i++) {
        *p++ = dmac[5 - i];
    }
}

bool ttn_setup() {
    Serial.println("ttn_setup");
    initCount();
    initDevEUI();
    SPI.begin(SCK_GPIO, MISO_GPIO, MOSI_GPIO, NSS_GPIO);
    return ( 1 == os_init_ex( (const void *) &lmic_pins ) );
}

void ttn_register(void (*callback)(uint8_t message)) {
    Serial.println("ttn_register");
    _lmic_callbacks.push_back(callback);
}


void ttn_join() {
    Serial.println("ttn_join");
    LMIC_reset();
    LMIC_selectSubBand(1);
    LMIC_setLinkCheckMode(0);
    ttn_sf(LORAWAN_SF);
    LMIC_startJoining();
    LMIC_startJoining();
    Serial.println("No session saved, joining from scratch");
}

void ttn_sf(unsigned char sf) {
    Serial.println("ttn_sf");
    LMIC_setDrTxpow(sf, 14);
}

void ttn_adr(bool enabled) {
    Serial.println("ttn_adr");
    LMIC_setAdrMode(enabled);
    LMIC_setLinkCheckMode(!enabled);
}
