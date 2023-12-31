
> Diese Seite bei [https://calliope-net.github.io/oled-eeprom/](https://calliope-net.github.io/oled-eeprom/) öffnen.

> Für die OLED Displays die Erweiterung [**calliope-net/oled-16x8**](https://calliope-net.github.io/oled-16x8/) verwenden.

### Calliope Erweiterung 'EEPROM Programmierung Zeichensatz für OLED Displays':

> OLED neu gedacht - 2 Displays gleichzeitig - EEPROM - 1 Stecker - i2c-Bus

> Querformat 16x8 - Hochformat 8x16 - 2x16x8=256 Zeichen auf einen Blick

> mehrere Zeichensätze je 256 Zeichen und Platz für Bilder im EEPROM

> Calliope funktioniert mit jeder (Speicher-) Konfiguration und Version (ab 1.3)

### Calliope Erweiterung für die i2c Module:

* [Qwiic Cable - Grove Adapter](https://www.sparkfun.com/products/15109)
* [Qwiic Cable Kit](https://www.sparkfun.com/products/15081)
* [SparkFun Qwiic EEPROM Breakout - 512Kbit](https://www.sparkfun.com/products/18355)

![](https://cdn.sparkfun.com//assets/parts/1/7/7/0/1/18355-SparkFun_Qwiic_EEPROM_Breakout_-_512Kbit-01.jpg)

* [SparkFun Qwiic OpenLog](https://www.sparkfun.com/products/15164)

![](https://cdn.sparkfun.com//assets/parts/1/3/5/5/4/15164-SparkFun_Qwiic_OpenLog-01.jpg)

Dieses Repository kann als **Erweiterung** in MakeCode hinzugefügt werden.

* öffne [makecode.calliope.cc](https://makecode.calliope.cc)
* klicke auf eine Projektvorlage
* klicke unter dem Zahnrad-Menü auf **Erweiterungen** (oder bei den Blöcken ganz unten)
* kopiere die folgende **Projekt-URL** in die Zwischenablage (Strg-C)
* **calliope-net/oled-eeprom**
* füge sie auf der Webseite oben ein (Strg-V) und klicke auf die Lupe (oder ENTER)
* wenn die Erweiterung gefunden wurde, klicke auf das Rechteck
* jetzt hat die Liste den neuen Eintrag **OLED EEPROM** bekommen

![](blocks.png)

### Beschreibung der Erweiterung 'EEPROM Programmierung Zeichensatz für OLED Displays'

> Die Erweiterung **calliope-net/bit** wird automatisch mit geladen.
> Die Erweiterung **calliope-net/oled-16x8** wird zum Programmieren des EEPROM nicht gebraucht.

> Wenn der EEPROM einmal programmiert ist, kann die Erweiterung **calliope-net/oled-eeprom** entfernt werden.
> Das OLED Display benötigt nur den programmierten EEPROM am i2c-Bus und die Erweiterung **calliope-net/oled-16x8**.

Das OLED Display kann nur Pixel anzeigen. Zeichen müssen als 'Bilder' mit 8x8 Punkten dargestellt werden.
Für 1 Zeichen werden 8 Byte im Zeichengenerator belegt. Für 128 ASCII Zeichen sind das 128*8 = 1024 Byte.
Mit einem Zeichencode von 8 Bit sind aber 256 Zeichen möglich. Die Codierungen zwischen 128 und 255 werden 
z.B. für Umlaute und Sonderzeichen benutzt. Für 256 Zeichen hat der Zeichengenerator eine Größe von 2048 Byte = 2KB.

Die Datenmenge für 96 ASCII-Zeichen lässt sich zwar im Programmcode unterbringen, aber der Platz ist bei Calliope begrenzt.
Calliope ist abgestürzt, wenn Bluetooth aktiviert war. Mit dem EEPROM wird kein Speicherplatz vom Calliope mehr 
belegt, weil die 8 Byte für jedes Zeichen direkt aus dem EEPROM gelesen werden.

Im EEPROM können mehrere Zeichensätze für Querformat 16 Zeilen x 8 Zeichen und Hochformat 8 Zeilen x 16 Zeichen 
an verschiedenen Adressen gespeichert sein. Wenn ein Zeichensatz 2KB belegt und der EEPROM 64KB
Speicherplatz hat, lassen sich auch noch Bilder unterbringen (und direkt auf das Display kopieren).

### Blöcke

#### 1. EEPROM aus String-Array im Code (Zeichencode 0x20-0x7F + Umlaute) programmieren

Dazu muss nur der EEPROM an i2c angeschlossen sein. Die letzten 2KB F800-FFFF werden mit den ASCII Zeichen beschrieben,
die im Code in String-Arrays gespeichert sind. Dabei bleiben viele Speicherbereiche frei, die später mit Sonderzeichen
belegt werden können. Die bekannten Umlaute und Sonderzeichen ÄÖÜäöüß€° werden entsprechend ihres Calliope-Zeichencodes
über die freien Stellen verteilt. (Calliope hat für nicht-ASCII Zeichen andere Zeichencodes als der Simulator.)

#### 2. EEPROM aus Datei auf Speicherkarte programmieren

Wie kommt ein großer Zeichensatz (oder ein Bild) auf den EEPROM? Natürlich von der Speicherkarte!
Dazu muss der EEPROM und Qwiic OpenLog an i2c angeschlossen sein. Auf die Speicherkarte ist die (Binär-) Datei
zu kopieren. Hier ist der [Zeichensatz vom Z 9001 (2048 Byte)](BM505.BIN). Die Zeichen sind 1/4 gedreht und werden 
auf dem Display im Hochformat 8 Zeilen x 16 Zeichen richtig angezeigt. Die Zeichen-Codes 0x80-0xFF sind mit
Pseudo-Grafik Zeichen belegt.

Für die Datei werden standardmäßig die vorletzten 2KB F000-F7FF auf dem EEPROM genutzt. Die Größe der Datei wird
von Qwiic OpenLog ermittelt und darf 2048 Byte nicht überschreiten. Die tatsächliche Größe wird auf ein Vielfaches
von 128 aufgerundet und ab Anfangsadresse (F000) in den EEPROM programmiert. Eine 1KB Datei (mit 128 Zeichen)
kann auch ab F400 programmiert werden. Kürzere Dateien belegen weniger EEPROM. Die Datei wird binär kopiert.

Der Block gibt false zurück, wenn die Datei nicht auf der Speicherkarte ist oder die Datei-Größe nicht stimmt.

#### 3. EEPROM 1 Zeichen (8 Byte) programmieren

Schließlich kann ein eigenes Zeichen aus 8 Byte für einen bestimmten Zeichencode programmiert werden.
Weil es ein EEPROM ist, kann es wieder überschrieben werden, bis es das richtige Bild ergibt.
Damit können auch alle vorhandenen Zeichen repariert (oder zerstört) werden.
Das wäre ein Grund, die Erweiterung **calliope-net/oled-eeprom** nach Gebrauch zu entfernen.
(JavaScript Ansicht - unter dem Simulator Explorer - oled-eeprom - Mülleimer)

![](blocks-advanced.png)

### Erweiterungen

> [Upates für Erweiterungen; Erweiterungen aus einem Projekt löschen.](https://calliope-net.github.io/i2c-liste#updates)

> [Alle i2c-Erweiterungen für MakeCode von calliope-net (Software).](https://calliope-net.github.io/i2c-liste#erweiterungen)

#### Calliope-Apps, .hex-Dateien, Bildschirmfotos mit Blöcken

> [Alle Beispiel-Projekte für MakeCode von calliope-net (Calliope-Apps).](https://calliope-net.github.io/i2c-liste#programmierbeispiele)

> GitHub-Profil calliope-net: [https://github.com/calliope-net](https://github.com/calliope-net)

### Bezugsquellen

> [Alle i2c-Module und Bezugsquellen (Hardware).](https://calliope-net.github.io/i2c-liste#bezugsquellen)

#### Metadaten (verwendet für Suche, Rendering)

* Calliope mini
* i2c
