
namespace oledeeprom_enums {
    export enum eH3 {
        //% block="000"
        x000 = 0x000,
        //% block="080"
        x080 = 0x080,
        //% block="100"
        x100 = 0x100,
        //% block="180"
        x180 = 0x180,
        //% block="200"
        x200 = 0x200,
        //% block="280"
        x280 = 0x280,
        //% block="300"
        x300 = 0x300,
        //% block="380"
        x380 = 0x380,
        //% block="400"
        x400 = 0x400,
        //% block="480"
        x480 = 0x480,
        //% block="500"
        x500 = 0x500,
        //% block="580"
        x580 = 0x580,
        //% block="600"
        x600 = 0x600,
        //% block="680"
        x680 = 0x680,
        //% block="700"
        x700 = 0x700,
        //% block="780"
        x780 = 0x780,
        //% block="800"
        x800 = 0x800,
        //% block="880"
        x880 = 0x880,
        //% block="900"
        x900 = 0x900,
        //% block="980"
        x980 = 0x980,
        A00 = 0xA00, A80 = 0xA80, B00 = 0xB00, B80 = 0xB80,
        C00 = 0xC00, C80 = 0xC80, D00 = 0xD00, D80 = 0xD80, E00 = 0xE00, E80 = 0xE80, F00 = 0xF00, F80 = 0xF80
    }
    export enum eH4 {
        //% block="0000"
        x0000 = 0x0000,
        //% block="1000"
        x1000 = 0x1000,
        //% block="2000"
        x2000 = 0x2000,
        //% block="3000"
        x3000 = 0x3000,
        //% block="4000"
        x4000 = 0x4000,
        //% block="5000"
        x5000 = 0x5000,
        //% block="6000"
        x6000 = 0x6000,
        //% block="7000"
        x7000 = 0x7000,
        //% block="8000"
        x8000 = 0x8000,
        //% block="9000"
        x9000 = 0x9000,
        A000 = 0xA000, B000 = 0xB000, C000 = 0xC000, D000 = 0xD000, E000 = 0xE000, F000 = 0xF000
    }

    export enum eCharCodeArray {
        //% block="00-0F ÄÖÜäöüß€°"
        x00_x0F,
        //% block="20-2F Satzzeichen"
        x20_x2F,
        //% block="30-3F Ziffern"
        x30_x3F,
        //% block="40-4F A .. O"
        x40_x4F,
        //% block="50-5F P .. _"
        x50_x5F,
        //% block="60-6F a .. o"
        x60_x6F,
        //% block="70-7F p .. ~"
        x70_x7F
    }

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
        //% block="1024 (128 Zeichen)"
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
        //% block="2048 (256 Zeichen)"
        x800 = 0x800
    }
}
