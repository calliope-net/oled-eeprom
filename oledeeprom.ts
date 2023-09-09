
//% color=#0000BF icon="\uf108" block="OLED EEPROM" weight=20
namespace oledeeprom
/* 230908 https://github.com/calliope-net/oled-eeprom
Erweiterung zum Programmieren des EEPROM für:
https://github.com/calliope-net/oled-16x8
Diese Erweiterung kann gelöscht werden, wenn der EEPROM einmal programmiert ist.

zum Programmieren der im Code vorhandenen Arrays auf den EEPROM:
SparkFun Qwiic EEPROM Breakout - 512Kbit
https://www.sparkfun.com/products/18355

zum Programmieren einer Datei (Zeichengenerator) auf den EEPROM:
SparkFun Qwiic OpenLog
https://www.sparkfun.com/products/15164

OLED Display neu programmiert von Lutz Elßner im September 2023
*/ {
    export enum eADDR_EEPROM { EEPROM = 0x50 }
    export enum eADDR_LOG { LOG_Qwiic = 0x2A, LOG_Qwiic_x29 = 0x29 }

    export enum eEEPROM_Startadresse { F800 = 0xF800, FC00 = 0xFC00, F000 = 0xF000, F400 = 0xF400 }



    // ========== group="EEPROM aus Char-Array im Code (7 * 128 Byte/16 Zeichen) programmieren"


    //% group="EEPROM aus Char-Array im Code (7 * 128 Byte) programmieren"
    //% block="i2c %pADDR_EEPROM ab %pEEPROM_Startadresse Zeichensatz aus den Arrays im Code programmieren"
    //% pADDR_EEPROM.shadow="oledeeprom_eADDR_EEPROM"
    //% pEEPROM_Startadresse.defl=oledeeprom.eEEPROM_Startadresse.F800
    export function burnArrays(pADDR_EEPROM: number, pEEPROM_Startadresse: eEEPROM_Startadresse) {
        writeEEPROM(pADDR_EEPROM, pEEPROM_Startadresse + 0x000, extendedCharacters)
        //writeEEPROM(pADDR_EEPROM, pEEPROM_Startadresse + 0x080, basicFontx10)
        writeEEPROM(pADDR_EEPROM, pEEPROM_Startadresse + 0x100, basicFontx20)
        writeEEPROM(pADDR_EEPROM, pEEPROM_Startadresse + 0x180, basicFontx30)
        writeEEPROM(pADDR_EEPROM, pEEPROM_Startadresse + 0x200, basicFontx40)
        writeEEPROM(pADDR_EEPROM, pEEPROM_Startadresse + 0x280, basicFontx50)
        writeEEPROM(pADDR_EEPROM, pEEPROM_Startadresse + 0x300, basicFontx60)
        writeEEPROM(pADDR_EEPROM, pEEPROM_Startadresse + 0x380, basicFontx70)
    }

    function writeEEPROM(pADDR_EEPROM: number, pStartadresse: number, pCharCodeArray: string[]) {
        if (pCharCodeArray.length == 16) {
            let bu = Buffer.create(130) // 130
            bu.setNumber(NumberFormat.UInt16BE, 0, pStartadresse)//page * 128)
            for (let i = 0; i <= 15; i++) {
                for (let j = 0; j <= 7; j++) {
                    bu.setUint8(2 + i * 8 + j, pCharCodeArray[i].charCodeAt(j))
                }
            }
            oledeeprom_i2cWriteBufferError = pins.i2cWriteBuffer(pADDR_EEPROM, bu)
            control.waitMicros(50000) // 50ms
        }
    }

    //% group="EEPROM 1 Zeichen (8 Byte) programmieren" advanced=true
    //% block="i2c %pADDR_EEPROM ab %pEEPROM_Startadresse Zeichencode | %pCharCode 8 Byte | %x0 %x1 %x2 %x3 %x4 %x5 %x6 %x7 programmieren"
    //% pADDR_EEPROM.shadow="oledeeprom_eADDR_EEPROM"
    //% pEEPROM_Startadresse.defl=oledeeprom.eEEPROM_Startadresse.F800
    //% pCharCode.shadow="bit_hex8"
    //% x0.shadow="bit_hex8" x1.shadow="bit_hex8" x2.shadow="bit_hex8" x3.shadow="bit_hex8"
    //% x4.shadow="bit_hex8" x5.shadow="bit_hex8" x6.shadow="bit_hex8" x7.shadow="bit_hex8"
    // inlineInputMode=inline
    export function prog1Zeichen(pADDR_EEPROM: number, pEEPROM_Startadresse: eEEPROM_Startadresse, pCharCode: number,
        x0: number, x1: number, x2: number, x3: number, x4: number, x5: number, x6: number, x7: number) {
        let bu = Buffer.create(10)
        bu.setNumber(NumberFormat.UInt16BE, 0, pEEPROM_Startadresse + pCharCode * 8)
        bu.setUint8(2, x0)
        bu.setUint8(3, x1)
        bu.setUint8(4, x2)
        bu.setUint8(5, x3)
        bu.setUint8(6, x4)
        bu.setUint8(7, x5)
        bu.setUint8(8, x6)
        bu.setUint8(9, x7)
        oledeeprom_i2cWriteBufferError = pins.i2cWriteBuffer(pADDR_EEPROM, bu)
        control.waitMicros(50000) // 50ms
    }
   
   
    const basicFontx20: string[] = [
        "\x00\x00\x00\x00\x00\x00\x00\x00", // " "
        "\x00\x00\x5F\x00\x00\x00\x00\x00", // "!"
        "\x00\x00\x07\x00\x07\x00\x00\x00", // """
        "\x00\x14\x7F\x14\x7F\x14\x00\x00", // "#"
        "\x00\x24\x2A\x7F\x2A\x12\x00\x00", // "$"
        "\x00\x23\x13\x08\x64\x62\x00\x00", // "%"
        "\x00\x36\x49\x55\x22\x50\x00\x00", // "&"
        "\x00\x00\x05\x03\x00\x00\x00\x00", // "'"
        "\x00\x1C\x22\x41\x00\x00\x00\x00", // "("
        "\x00\x41\x22\x1C\x00\x00\x00\x00", // ")"
        "\x00\x08\x2A\x1C\x2A\x08\x00\x00", // "*"
        "\x00\x08\x08\x3E\x08\x08\x00\x00", // "+"
        "\x00\xA0\x60\x00\x00\x00\x00\x00", // ","
        "\x00\x08\x08\x08\x08\x08\x00\x00", // "-"
        "\x00\x60\x60\x00\x00\x00\x00\x00", // "."
        "\x00\x20\x10\x08\x04\x02\x00\x00", // "/"
    ]
    const basicFontx30: string[] = [
        "\x00\x3E\x51\x49\x45\x3E\x00\x00", // "0"
        "\x00\x00\x42\x7F\x40\x00\x00\x00", // "1"
        "\x00\x62\x51\x49\x49\x46\x00\x00", // "2"
        "\x00\x22\x41\x49\x49\x36\x00\x00", // "3"
        "\x00\x18\x14\x12\x7F\x10\x00\x00", // "4"
        "\x00\x27\x45\x45\x45\x39\x00\x00", // "5"
        "\x00\x3C\x4A\x49\x49\x30\x00\x00", // "6"
        "\x00\x01\x71\x09\x05\x03\x00\x00", // "7"
        "\x00\x36\x49\x49\x49\x36\x00\x00", // "8"
        "\x00\x06\x49\x49\x29\x1E\x00\x00", // "9"
        "\x00\x00\x36\x36\x00\x00\x00\x00", // ":"
        "\x00\x00\xAC\x6C\x00\x00\x00\x00", // ";"
        "\x00\x08\x14\x22\x41\x00\x00\x00", // "<"
        "\x00\x14\x14\x14\x14\x14\x00\x00", // "="
        "\x00\x41\x22\x14\x08\x00\x00\x00", // ">"
        "\x00\x02\x01\x51\x09\x06\x00\x00", // "?"
    ]
    const basicFontx40: string[] = [
        "\x00\x32\x49\x79\x41\x3E\x00\x00", // "@""
        "\x00\x7E\x09\x09\x09\x7E\x00\x00", // "A"
        "\x00\x7F\x49\x49\x49\x36\x00\x00", // "B"
        "\x00\x3E\x41\x41\x41\x22\x00\x00", // "C"
        "\x00\x7F\x41\x41\x22\x1C\x00\x00", // "D"
        "\x00\x7F\x49\x49\x49\x41\x00\x00", // "E"
        "\x00\x7F\x09\x09\x09\x01\x00\x00", // "F"
        "\x00\x3E\x41\x41\x51\x72\x00\x00", // "G"
        "\x00\x7F\x08\x08\x08\x7F\x00\x00", // "H"
        "\x00\x41\x7F\x41\x00\x00\x00\x00", // "I"
        "\x00\x20\x40\x41\x3F\x01\x00\x00", // "J"
        "\x00\x7F\x08\x14\x22\x41\x00\x00", // "K"
        "\x00\x7F\x40\x40\x40\x40\x00\x00", // "L"
        "\x00\x7F\x02\x0C\x02\x7F\x00\x00", // "M"
        "\x00\x7F\x04\x08\x10\x7F\x00\x00", // "N"
        "\x00\x3E\x41\x41\x41\x3E\x00\x00", // "O"
    ]
    const basicFontx50: string[] = [
        "\x00\x7F\x09\x09\x09\x06\x00\x00", // "P"
        "\x00\x3E\x41\x51\x21\x5E\x00\x00", // "Q"
        "\x00\x7F\x09\x19\x29\x46\x00\x00", // "R"
        "\x00\x26\x49\x49\x49\x32\x00\x00", // "S"
        "\x00\x01\x01\x7F\x01\x01\x00\x00", // "T"
        "\x00\x3F\x40\x40\x40\x3F\x00\x00", // "U"
        "\x00\x1F\x20\x40\x20\x1F\x00\x00", // "V"
        "\x00\x3F\x40\x38\x40\x3F\x00\x00", // "W"
        "\x00\x63\x14\x08\x14\x63\x00\x00", // "X"
        "\x00\x03\x04\x78\x04\x03\x00\x00", // "Y"
        "\x00\x61\x51\x49\x45\x43\x00\x00", // "Z"
        "\x00\x7F\x41\x41\x00\x00\x00\x00", // """
        "\x00\x02\x04\x08\x10\x20\x00\x00", // "\"
        "\x00\x41\x41\x7F\x00\x00\x00\x00", // """
        "\x00\x04\x02\x01\x02\x04\x00\x00", // "^"
        "\x00\x80\x80\x80\x80\x80\x00\x00", // "_"
    ]
    const basicFontx60: string[] = [
        "\x00\x01\x02\x04\x00\x00\x00\x00", // "`"
        "\x00\x20\x54\x54\x54\x78\x00\x00", // "a"
        "\x00\x7F\x48\x44\x44\x38\x00\x00", // "b"
        "\x00\x38\x44\x44\x28\x00\x00\x00", // "c"
        "\x00\x38\x44\x44\x48\x7F\x00\x00", // "d"
        "\x00\x38\x54\x54\x54\x18\x00\x00", // "e"
        "\x00\x08\x7E\x09\x02\x00\x00\x00", // "f"
        "\x00\x18\xA4\xA4\xA4\x7C\x00\x00", // "g"
        "\x00\x7F\x08\x04\x04\x78\x00\x00", // "h"
        "\x00\x00\x7D\x00\x00\x00\x00\x00", // "i"
        "\x00\x80\x84\x7D\x00\x00\x00\x00", // "j"
        "\x00\x7F\x10\x28\x44\x00\x00\x00", // "k"
        "\x00\x41\x7F\x40\x00\x00\x00\x00", // "l"
        "\x00\x7C\x04\x18\x04\x78\x00\x00", // "m"
        "\x00\x7C\x08\x04\x7C\x00\x00\x00", // "n"
        "\x00\x38\x44\x44\x38\x00\x00\x00", // "o"
    ]
    const basicFontx70: string[] = [
        "\x00\xFC\x24\x24\x18\x00\x00\x00", // "p"
        "\x00\x18\x24\x24\xFC\x00\x00\x00", // "q"
        "\x00\x00\x7C\x08\x04\x00\x00\x00", // "r"
        "\x00\x48\x54\x54\x24\x00\x00\x00", // "s"
        "\x00\x04\x7F\x44\x00\x00\x00\x00", // "t"
        "\x00\x3C\x40\x40\x7C\x00\x00\x00", // "u"
        "\x00\x1C\x20\x40\x20\x1C\x00\x00", // "v"
        "\x00\x3C\x40\x30\x40\x3C\x00\x00", // "w"
        "\x00\x44\x28\x10\x28\x44\x00\x00", // "x"
        "\x00\x1C\xA0\xA0\x7C\x00\x00\x00", // "y"
        "\x00\x44\x64\x54\x4C\x44\x00\x00", // "z"
        "\x00\x08\x36\x41\x00\x00\x00\x00", // "{"
        "\x00\x00\x7F\x00\x00\x00\x00\x00", // "|"
        "\x00\x41\x36\x08\x00\x00\x00\x00", // "}"
        "\x00\x02\x01\x01\x02\x01\x00\x00", // "~"
        "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF"  // 127
    ]

    //const basicFont: string[] = [];

    const extendedCharacters: string[] = [
        "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF",
        "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF",
        "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF",
        "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF",
        "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF",
        "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF",
        "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF",
        "\x00\x7D\x0A\x09\x0A\x7D\x00\x00", // "Ä"
        "\x00\x3D\x42\x41\x42\x3D\x00\x00", // "Ö"
        "\x00\x3D\x40\x40\x40\x3D\x00\x00", // "Ü"
        "\x00\x21\x54\x54\x55\x78\x00\x00", // "ä"
        "\x00\x39\x44\x44\x39\x00\x00\x00", // "ö"
        "\x00\x3D\x40\x40\x7D\x00\x00\x00", // "ü"
        "\x00\xFE\x09\x49\x36\x00\x00\x00", // "ß"
        "\x00\x14\x3E\x55\x55\x55\x14\x00", // "€"
        "\x00\x02\x05\x02\x00\x00\x00\x00"  // "°"
    ];


    // ========== group="EEPROM aus Datei auf Speicherkarte programmieren"

    // ========== SparkFun Qwiic OpenLog, Zeichengenerator von Speicherkarte lesen 2048 Byte .BIN Datei


    //% group="Datei auf Speicherkarte kopieren und in SparkFun Qwiic OpenLog stecken"
    //% block="https://github.com/calliope-net/oled-eeprom/blob/master/BM505.BIN"
    export function link() { return "https://github.com/calliope-net/oled-eeprom/blob/master/BM505.BIN" }



    export enum ePage128 {
        //% block="128"
        x080 = 0x080,
        //% block="256"
        x100 = 0x100,
        //% block="384"
        x180 = 0x180,
        //% block="512"
        x200 = 0x200,
        //% block="640"
        x280 = 0x280,
        //% block="768"
        x300 = 0x300,
        //% block="896"
        x380 = 0x380,
        //% block="1024"
        x400 = 0x400,
        //% block="1152"
        x480 = 0x480,
        //% block="1280"
        x500 = 0x500,
        //% block="1408"
        x580 = 0x580,
        //% block="1536"
        x600 = 0x600,
        //% block="1664"
        x680 = 0x680,
        //% block="1792"
        x700 = 0x700,
        //% block="1920"
        x780 = 0x780,
        //% block="2048"
        x800 = 0x800,
    }


    export enum eWriteStringReadString { readFile = 9, list = 14, } // Qwiic OpenLog Register Nummern

    //% group="EEPROM aus Datei auf Speicherkarte (1024 Byte=128 Zeichen) programmieren"
    //% block="i2c %pADDR_EEPROM ab %pEEPROM_Startadresse Zeichensatz aus Datei i2c %pADDR_LOG %pFilename %pAnzahlBytes Byte programmieren"
    //% pADDR_EEPROM.shadow="oledeeprom_eADDR_EEPROM"
    //% pEEPROM_Startadresse.defl=oledeeprom.eEEPROM_Startadresse.F000
    //% pFilename.defl="BM505.BIN"
    //% pAnzahlBytes.defl=oledeeprom.ePage128.x800
    //% inlineInputMode=inline
    export function progFile(pADDR_EEPROM: number, pEEPROM_Startadresse: eEEPROM_Startadresse,
        pADDR_LOG: eADDR_LOG, pFilename: string, pAnzahlBytes: ePage128) {

        let filenameBuffer = Buffer.fromUTF8(pFilename)
        let logBuffer = Buffer.create(1 + filenameBuffer.length)

        // filename von einem Buffer in den anderen füllen
        logBuffer.write(1, filenameBuffer)

        // mit DIR feststellen, ob Datei vorhanden ist
        logBuffer.setUint8(0, eWriteStringReadString.list) // LIST command
        oledeeprom_i2cWriteBufferError = pins.i2cWriteBuffer(pADDR_LOG, logBuffer)
        control.waitMicros(50000) // 50ms

        //  ersten Dateiname lesen
        filenameBuffer = pins.i2cReadBuffer(pADDR_LOG, 32)
        control.waitMicros(50000) // 50ms
        if (filenameBuffer.toString().substr(0, pFilename.length) != pFilename) {
            /* 
            oledssd1315.writeText(oledssd1315.eADDR.OLED_16x8_x3D, 0, 0, 15, oledssd1315.eAlign.left, pFilename)
            oledssd1315.writeText(oledssd1315.eADDR.OLED_16x8_x3D, 1, 0, 15, oledssd1315.eAlign.left, filenameBuffer.toString())
            */
            return false // file not found
        } else {

            logBuffer.setUint8(0, eWriteStringReadString.readFile) // READ command
            // filename steht ab offset=1 schon im logBuffer

            // Dateiname senden, open read
            oledeeprom_i2cWriteBufferError = pins.i2cWriteBuffer(pADDR_LOG, logBuffer)
            control.waitMicros(50000) // 50ms

            let eepromBuffer = Buffer.create(130)
            for (let page = 0; page < pAnzahlBytes / 128; page++) { // (let page = 0; page < pAnzahlPages128; page++)

                // 128 Byte von Speicherkarte lesen als 4 * 32 Byte
                // Qwiic OpenLog überträgt nur 32 Byte in einem Buffer
                // EEPROM kann (2 Byte Adresse) + 128 Byte in einem Buffer schreiben
                logBuffer = pins.i2cReadBuffer(pADDR_LOG, 32) // 128
                // 32 Byte von einem Buffer in den anderen füllen
                eepromBuffer.write(2, logBuffer)
                control.waitMicros(5000) // 5ms

                logBuffer = pins.i2cReadBuffer(pADDR_LOG, 32)
                eepromBuffer.write(34, logBuffer)
                control.waitMicros(5000) // 5ms

                logBuffer = pins.i2cReadBuffer(pADDR_LOG, 32)
                eepromBuffer.write(66, logBuffer)
                control.waitMicros(5000) // 5ms

                logBuffer = pins.i2cReadBuffer(pADDR_LOG, 32)
                eepromBuffer.write(98, logBuffer)
                control.waitMicros(5000) // 5ms

                // EEPROM Buffer 2 Byte startAdrEEPROM
                eepromBuffer.setNumber(NumberFormat.UInt16BE, 0, pEEPROM_Startadresse + page * 128)//pageEEPROM * 128 + page * 128)
                /* 
                if (page >= 0 && page <= 7) {
                    oledssd1315.writeText(oledssd1315.eADDR.OLED_16x8_x3D, page, 0, 7, oledssd1315.eAlign.left,
                        eepromBuffer.slice(0, 6).toHex() //+ " " + eepromBuffer.slice(0, 2).toHex()
                    )

                } else if (page >= 8 && page <= 15) {
                    oledssd1315.writeText(oledssd1315.eADDR.OLED_16x8_x3D, page - 8, 8, 15, oledssd1315.eAlign.left,
                        eepromBuffer.slice(0, 6).toHex() //+ eepromBuffer.slice(0, 2).toHex()
                    )
                }
                */
                // 2+128 Byte auf EEPROM brennen (1 Page)
                oledeeprom_i2cWriteBufferError = pins.i2cWriteBuffer(pADDR_EEPROM, eepromBuffer)
                control.waitMicros(50000) // 50ms

            }
            return true
        }

    }




    // kann aus den Arrays die Pixel (8 Byte für 1 Zeichen) holen
    // wenn kein EEPROM vorhanden ist, der die Pixel enthält
    export function getPixel8Byte(pCharCode: number) {
        let charCodeArray: string[]
        switch (pCharCode & 0xF0) {
            case 0x00: { charCodeArray = extendedCharacters; break; }
            case 0x20: { charCodeArray = basicFontx20; break; } // 16 string-Elemente je 8 Byte = 128
            case 0x30: { charCodeArray = basicFontx30; break; }
            case 0x40: { charCodeArray = basicFontx40; break; }
            case 0x50: { charCodeArray = basicFontx50; break; }
            case 0x60: { charCodeArray = basicFontx60; break; }
            case 0x70: { charCodeArray = basicFontx70; break; }
        }
        let bu = Buffer.create(128)

        for (let i = 0; i <= 15; i++) {
            for (let j = 0; j <= 7; j++) {
                bu.setUint8(i * 8 + j, charCodeArray[i].charCodeAt(j))
            }
        }

        let offset = (pCharCode & 0x0F) * 8 // max 15*8=120

        return bu.slice(offset, 8)
    }



    // ========== group="i2c"

    //% blockId=oledeeprom_eADDR_EEPROM blockHidden=true
    //% group="i2c Adressen"
    //% block="%pADDR" weight=4
    export function oledeeprom_eADDR_EEPROM(pADDR: eADDR_EEPROM): number { return pADDR }

    //% group="i2c" advanced=true
    //% block="Fehlercode vom letzten WriteBuffer (0 ist kein Fehler)" weight=2
    export function i2cError() { return oledeeprom_i2cWriteBufferError }
    let oledeeprom_i2cWriteBufferError: number = 0 // Fehlercode vom letzten WriteBuffer (0 ist kein Fehler)

} // oledeeprom.ts
