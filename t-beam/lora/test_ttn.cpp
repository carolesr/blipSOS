#include <lmic.h>
#include <hal/hal.h>
#include "axp20x.h"
#include <Preferences.h>
#include <SPI.h>
#include <vector>
#include "configuration.h"
#include "credentials.h"
#include <Arduino.h>


const lmic_pinmap lmic_pins = {
    .nss = NSS_GPIO,
    .rxtx = LMIC_UNUSED_PIN,
    .rst = RESET_GPIO,
    .dio = {DIO0_GPIO, DIO1_GPIO, DIO2_GPIO},
};
static RTC_DATA_ATTR uint32_t count = 0;
std::vector<void(*)(uint8_t message)> _lmic_callbacks;
AXP20X_Class axp;
bool pmu_irq = false;
String baChStatus = "No charging";
bool ssd1306_found = false;
bool axp192_found = false;
bool packetSent, packetQueued;

#ifdef USE_ABP
    // These callbacks are only used in over-the-air activation, so they are
    // left empty here (we cannot leave them out completely unless
    // DISABLE_JOIN is set in config.h, otherwise the linker will complain).
    void os_getArtEui (u1_t* buf) { }
    void os_getDevEui (u1_t* buf) { }
    void os_getDevKey (u1_t* buf) { }
#endif

#ifdef USE_OTAA
    void os_getArtEui (u1_t* buf) { memcpy_P(buf, APPEUI, 8); }
    void os_getDevEui (u1_t* buf) { memcpy(buf, DEVEUI, 8); }
    void os_getDevKey (u1_t* buf) { memcpy_P(buf, APPKEY, 16); }
#endif


void setup() {
    Serial.begin(115200);
    delay(5000);
    Serial.println("SETUP");

    Wire.begin(I2C_SDA, I2C_SCL);
    scanI2Cdevice();

    axp192Init();

    if (!ttn_setup()) {
        Serial.println("[ERR] Radio module not found!\n");
    }
    else {
        ttn_register(callback);
        ttn_join();
        ttn_adr(LORAWAN_ADR);
    }
}

void scanI2Cdevice(void) {
    byte err, addr;
    int nDevices = 0;
    for (addr = 1; addr < 127; addr++) {
        Wire.beginTransmission(addr);
        err = Wire.endTransmission();
        if (err == 0) {
            Serial.print("I2C device found at address 0x");
            if (addr < 16)
                Serial.print("0");
            Serial.print(addr, HEX);
            Serial.println(" !");
            nDevices++;

            if (addr == SSD1306_ADDRESS) {
                ssd1306_found = true;
                Serial.println("ssd1306 display found");
            }
            if (addr == AXP192_SLAVE_ADDRESS) {
                axp192_found = true;
                Serial.println("axp192 PMU found");
            }
        } else if (err == 4) {
            Serial.print("Unknow error at address 0x");
            if (addr < 16)
                Serial.print("0");
            Serial.println(addr, HEX);
        }
    }
    if (nDevices == 0)
        Serial.println("No I2C devices found\n");
    else
        Serial.println("done\n");
}

void axp192Init() {
    if (axp192_found) {
        if (!axp.begin(Wire, AXP192_SLAVE_ADDRESS)) {
            Serial.println("AXP192 Begin PASS");
        } else {
            Serial.println("AXP192 Begin FAIL");
        }
        // axp.setChgLEDMode(LED_BLINK_4HZ);
        Serial.printf("DCDC1: %s\n", axp.isDCDC1Enable() ? "ENABLE" : "DISABLE");
        Serial.printf("DCDC2: %s\n", axp.isDCDC2Enable() ? "ENABLE" : "DISABLE");
        Serial.printf("LDO2: %s\n", axp.isLDO2Enable() ? "ENABLE" : "DISABLE");
        Serial.printf("LDO3: %s\n", axp.isLDO3Enable() ? "ENABLE" : "DISABLE");
        Serial.printf("DCDC3: %s\n", axp.isDCDC3Enable() ? "ENABLE" : "DISABLE");
        Serial.printf("Exten: %s\n", axp.isExtenEnable() ? "ENABLE" : "DISABLE");
        Serial.println("----------------------------------------");

        axp.setPowerOutPut(AXP192_LDO2, AXP202_ON);  // LORA radio
        axp.setPowerOutPut(AXP192_LDO3, AXP202_ON);  // GPS main power
        axp.setPowerOutPut(AXP192_DCDC2, AXP202_ON);
        axp.setPowerOutPut(AXP192_EXTEN, AXP202_ON);
        axp.setPowerOutPut(AXP192_DCDC1, AXP202_ON);
        axp.setDCDC1Voltage(3300);  // for the OLED power

        Serial.printf("DCDC1: %s\n", axp.isDCDC1Enable() ? "ENABLE" : "DISABLE");
        Serial.printf("DCDC2: %s\n", axp.isDCDC2Enable() ? "ENABLE" : "DISABLE");
        Serial.printf("LDO2: %s\n", axp.isLDO2Enable() ? "ENABLE" : "DISABLE");
        Serial.printf("LDO3: %s\n", axp.isLDO3Enable() ? "ENABLE" : "DISABLE");
        Serial.printf("DCDC3: %s\n", axp.isDCDC3Enable() ? "ENABLE" : "DISABLE");
        Serial.printf("Exten: %s\n", axp.isExtenEnable() ? "ENABLE" : "DISABLE");

        pinMode(PMU_IRQ, INPUT_PULLUP);
        attachInterrupt(PMU_IRQ, [] {
            pmu_irq = true;
        }, FALLING);

        axp.adc1Enable(AXP202_BATT_CUR_ADC1, 1);
        axp.enableIRQ(AXP202_VBUS_REMOVED_IRQ | AXP202_VBUS_CONNECT_IRQ | AXP202_BATT_REMOVED_IRQ | AXP202_BATT_CONNECT_IRQ, 1);
        axp.clearIRQ();

        if (axp.isChargeing()) {
            baChStatus = "Charging";
        }
    } else {
        Serial.println("AXP192 not found");
    }
}


static void initCount() {
  if(count == 0) {
    Preferences p;
    if(p.begin("lora", true)) {
        count = p.getUInt("count", 0);
        p.end();
    }
  }
}

#ifdef USE_OTAA
    // generate DevEUI from macaddr if needed
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
        // deveui is LSB, we reverse it so TTN DEVEUI display
        // will remain the same as MAC address
        // MAC is 6 bytes, devEUI 8, set first 2 ones
        // with an arbitrary value
        *p++ = 0xFF;
        *p++ = 0xFE;
        // Then next 6 bytes are mac address reversed
        for (i = 0; i < 6; i++) {
            *p++ = dmac[5 - i];
        }
    }
#endif


bool ttn_setup() {
    Serial.println("ttn_setup");
    initCount();

    #if defined(USE_OTAA)
        initDevEUI();
    #endif

    // SPI interface
    SPI.begin(SCK_GPIO, MISO_GPIO, MOSI_GPIO, NSS_GPIO);

    // LMIC init
    return ( 1 == os_init_ex( (const void *) &lmic_pins ) );
}

void ttn_register(void (*callback)(uint8_t message)) {
    Serial.println("ttn_register");
    _lmic_callbacks.push_back(callback);
}

void ttn_join() {
    Serial.println("ttn_join");
    // Reset the MAC state. Session and pending data transfers will be discarded.
    LMIC_reset();

    #ifdef CLOCK_ERROR
        LMIC_setClockError(MAX_CLOCK_ERROR * CLOCK_ERROR / 100);
    #endif

    #if defined(CFG_eu868)
        Serial.println("CFG_eu868");

        // Set up the channels used by the Things Network, which corresponds
        // to the defaults of most gateways. Without this, only three base
        // channels from the LoRaWAN specification are used, which certainly
        // works, so it is good for debugging, but can overload those
        // frequencies, so be sure to configure the full frequency range of
        // your network here (unless your network autoconfigures them).
        // Setting up channels should happen after LMIC_setSession, as that
        // configures the minimal channel set.
        LMIC_setupChannel(0, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
        LMIC_setupChannel(1, 868300000, DR_RANGE_MAP(DR_SF12, DR_SF7B), BAND_CENTI);      // g-band
        LMIC_setupChannel(2, 868500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
        LMIC_setupChannel(3, 867100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
        LMIC_setupChannel(4, 867300000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
        LMIC_setupChannel(5, 867500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
        LMIC_setupChannel(6, 867700000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
        LMIC_setupChannel(7, 867900000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
        LMIC_setupChannel(8, 868800000, DR_RANGE_MAP(DR_FSK,  DR_FSK),  BAND_MILLI);      // g2-band

    #elif defined(CFG_us915)
        Serial.println("CFG_us915 1");

        // NA-US channels 0-71 are configured automatically
        // but only one group of 8 should (a subband) should be active
        // TTN recommends the second sub band, 1 in a zero based count.
        // https://github.com/TheThingsNetwork/gateway-conf/blob/master/US-global_conf.json
        // in the US, with TTN, it saves join time if we start on subband 1
        // (channels 8-15). This will get overridden after the join by
        // parameters from the network. If working with other networks or in
        // other regions, this will need to be changed.
        LMIC_selectSubBand(1);

    #elif defined(CFG_au915)
        Serial.println("CFG_au915 2");

        // set sub band for AU915
        // https://github.com/TheThingsNetwork/gateway-conf/blob/master/AU-global_conf.json
        LMIC_selectSubBand(1);

    #endif

        // TTN defines an additional channel at 869.525Mhz using SF9 for class B
        // devices' ping slots. LMIC does not have an easy way to define set this
        // frequency and support for class B is spotty and untested, so this
        // frequency is not configured here.

        // Disable link check validation
        LMIC_setLinkCheckMode(0);

        #ifdef SINGLE_CHANNEL_GATEWAY
            forceTxSingleChannelDr();
        #else
            // Set default rate and transmit power for uplink (note: txpow seems to be ignored by the library)
            ttn_sf(LORAWAN_SF);
        #endif

    #if defined(USE_ABP)

        // Set static session parameters. Instead of dynamically establishing a session
        // by joining the network, precomputed session parameters are be provided.
        uint8_t appskey[sizeof(APPSKEY)];
        uint8_t nwkskey[sizeof(NWKSKEY)];
        memcpy_P(appskey, APPSKEY, sizeof(APPSKEY));
        memcpy_P(nwkskey, NWKSKEY, sizeof(NWKSKEY));
        LMIC_setSession(0x1, DEVADDR, nwkskey, appskey);

        // TTN uses SF9 for its RX2 window.
        LMIC.dn2Dr = DR_SF9;

        // Trigger a false joined
        _ttn_callback(EV_JOINED);

    #elif defined(USE_OTAA)

        // Make LMiC initialize the default channels, choose a channel, and
        // schedule the OTAA join
        LMIC_startJoining();

        #ifdef SINGLE_CHANNEL_GATEWAY
            // LMiC will already have decided to send on one of the 3 default
            // channels; ensure it uses the one we want
            LMIC.txChnl = SINGLE_CHANNEL_GATEWAY;
        #endif

        Preferences p;
        p.begin("lora", true); // we intentionally ignore failure here
        uint32_t netId = p.getUInt("netId", UINT32_MAX);
        uint32_t devAddr = p.getUInt("devAddr", UINT32_MAX);
        uint8_t nwkKey[16], artKey[16];
        bool keysgood = p.getBytes("nwkKey", nwkKey, sizeof(nwkKey)) == sizeof(nwkKey) && 
                        p.getBytes("artKey", artKey, sizeof(artKey)) == sizeof(artKey);
        p.end(); // close our prefs

        Serial.println("No session saved, joining from scratch");
        LMIC_startJoining();

        // if(!keysgood) {
        //     // We have not yet joined a network, start a full join attempt
        //     // Make LMiC initialize the default channels, choose a channel, and
        //     // schedule the OTAA join
        //     Serial.println("No session saved, joining from scratch");
        //     LMIC_startJoining();
        // }
        // else {
        //     Serial.println("Rejoining saved session");
        //     LMIC_setSession(netId, devAddr, nwkKey, artKey);

        //     // Trigger a false joined
        //     _ttn_callback(EV_JOINED);
        // }

    #endif
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
        Serial.println("EV_JOINED");
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

    // We only want to say 'packetSent' for our packets (not packets needed for joining)
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




void loop() {
    // Serial.println("loop");
    ttn_loop();

    static uint32_t last = 0;
    static bool first = true;
    if (0 == last || millis() - last > SEND_INTERVAL) {
        if (trySend()) {
            last = millis();
            first = false;
            Serial.println("TRANSMITTED");
        }
        else {
            if (first) {
                Serial.println("Waiting GPS lock\n");
                first = false;
            }

            // No GPS lock yet, let the OS put the main CPU in low power mode for 100ms (or until another interrupt comes in)
            // i.e. don't just keep spinning in loop as fast as we can.
            delay(100);
        }
    }
}

void ttn_loop() {
    os_runloop_once();
}

uint32_t ttn_get_count() {
  return count;
}

bool trySend() {
    Serial.println("trySend");
    packetSent = false;
    // We also wait for altitude being not exactly zero, because the GPS chip generates a bogus 0 alt report when first powered on

    #if LORAWAN_CONFIRMED_EVERY > 0
        bool confirmed = (ttn_get_count() % LORAWAN_CONFIRMED_EVERY == 0);
        if (confirmed){ Serial.println("confirmation enabled"); }
    #else
        bool confirmed = false;
    #endif

    packetQueued = true;
    uint8_t txBuffer[10] = {};
    ttn_send(txBuffer, sizeof(txBuffer), LORAWAN_PORT, confirmed);
    return true;
}

void ttn_send(uint8_t * data, uint8_t data_size, uint8_t port, bool confirmed){
    Serial.println("ttn_send");
    ttn_set_cnt(); // we are about to send using the current packet count

    // Check if there is not a current TX/RX job running
    if (LMIC.opmode & OP_TXRXPEND) {
        _ttn_callback(EV_PENDING);
        return;
    }

    // Prepare upstream data transmission at the next possible time.
    // Parameters are port, data, length, confirmed
    LMIC_setTxData2(port, data, data_size, confirmed ? 1 : 0);

    _ttn_callback(EV_QUEUED);
    count++;
}

static void ttn_set_cnt() {
    LMIC_setSeqnoUp(count);

    // We occasionally mirror our count to flash, to ensure that if we lose power we will at least start with a count that is almost correct 
    // (otherwise the TNN network will discard packets until count once again reaches the value they've seen).  We limit these writes to a max rate
    // of one write every 5 minutes.  Which should let the FLASH last for 300 years (given the ESP32 NVS algoritm)
    static uint32_t lastWriteMsec = UINT32_MAX; // Ensure we write at least once
    uint32_t now = millis();
    if(now < lastWriteMsec || (now - lastWriteMsec) > 5 * 60 * 1000L) { // write if we roll over (50 days) or 5 mins
        lastWriteMsec = now;

        Preferences p;
        if(p.begin("lora", false)) {
            p.putUInt("count", count);
            p.end();
        }
    }
}

// LMIC library will call this method when an event is fired
void onEvent(ev_t event) {
    Serial.println("onEvent");
    switch(event) {
    case EV_JOINED: {
        #ifdef SINGLE_CHANNEL_GATEWAY
            forceTxSingleChannelDr();
        #endif

        // Disable link check validation (automatically enabled
        // during join, but because slow data rates change max TX
        // size, we don't use it in this example.
        if(!LORAWAN_ADR){
            LMIC_setLinkCheckMode(0); // Link check problematic if not using ADR. Must be set after join
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

    // Send message callbacks
    _ttn_callback(event);
}

static void printHex2(unsigned v) {
    v &= 0xff;
    if (v < 16)
        Serial.print('0');
    Serial.print(v, HEX);
}
