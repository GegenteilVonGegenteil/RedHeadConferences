# Offline-Strategie für Redhead Conferences

## Status
For Review

## Ausgangslage
Unsere Webseite zeigt User:innen alle Sessions und Sprecher:innen als Überblick und im Detail an. Zudem können sie Sessions zu ihrem persönlichen Programm hinzufügen, was aktuell über LocalStorage funktioniert. Da während der Konferenz oft keine oder nur eine schwache Internetverbindung besteht, muss die Seite auch offline nutzbar sein.

## Strategie pro Datentyp
### Session- und Speaker-Daten
**Änderungshäufigkeit:** selten bis gar nicht

#### Optionen
**Cache-First:** Gecachte Daten werden bevorzugt, das Netzwerk dient als Fallback. Die Netzwerklast ist niedrig, die Daten können jedoch veralten.

**Stale-While-Revalidate:** Zuerst wird der Cache angezeigt, im Hintergrund werden aktuellere Daten geladen. Änderungen werden so online übernommen, die Seite bleibt offline nutzbar. Die Netzwerklast ist höher.

#### Entscheidung
Wir nutzen Stale-While-Revalidate. Auch wenn sich die Daten selten ändern, sind Raum- oder Zeitänderungen gerade an den Konferenztagen essenziell. Wären keine Änderungen mehr zu erwarten, würde Cache-First genügen.

#### Konsequenzen
Höhere Netzwerklast. Aktualisierte Daten erscheinen erst beim nächsten Laden bzw. nach einem Re-Render der Ansicht. Offline sehen User:innen den zuletzt gecachten Stand.

### App-Shell, Icons, Fonts, Token-CSS
**Änderungshäufigkeit:** nur bei Deployment

#### Optionen
**Cache-Only:** Daten kommen ausschließlich aus dem Cache. Es ist keine Netzwerkanfrage nötig, aber fehlt etwas im Cache, schlägt die Anfrage fehl, und Updates sind nur mit Zusatzaufwand möglich.

**Cache-First:** Der Cache wird bevorzugt, bei Bedarf wird auf das Netzwerk zurück gegriffen. Neue Versionen können über den Service Worker ausgeliefert werden.

#### Entscheidung
Wir nutzen Cache-First mit Precaching. Die Shell soll unter jeglichen Bedingungen erreichbar sein, ändert sich aber bei Deployments. Neue Versionen kündigen wir mit dem Hinweis „Neue Version verfügbar“ an.

#### Konsequenzen
Eine neue Version wird erst nach dem Update des Service Workers aktiv. Das ist etwas aufwendiger als Cache-Only, ermöglicht aber Änderungen.

### Mein Programm
Änderungshäufigkeit: bei jeder Änderung durch die User:innen

#### Optionen
**LocalStorage:** Einfach und synchron, aber auf Strings und ca. 5 MB begrenzt.

**IndexedDB:** Asynchron und größer, aber komplexer in der Umsetzung.

#### Entscheidung
Die Daten bleiben in LocalStorage und benötigen keine Caching-Strategie. Damit sie offline erreichbar sind, werden die Route „Mein Programm“ und die Shell precached. Die Session-Details dazu stammen aus dem Cache der Session-Daten.

#### Konsequenzen
Das persönliche Programm ist immer offline verfügbar, aber gerätegebunden und ohne Synchronisation. Werden die Browserdaten gelöscht, gehen sie verloren.

## Konkrete Nutzungssituation
Im Vortragssaal oder im Flugmodus zwischen zwei Sessions stehen Shell, Programmdaten und „Mein Programm“ auch ohne Netz zur Verfügung. Bei einem kompletten Verbindungsabbruch mitten in der Nutzung bleibt die App voll bedienbar. Nicht möglich sind Update-Prüfungen, weshalb wir zusätzlich den Zeitpunkt der letzten Aktualisierung anzeigen. So erkennen User:innen, wie aktuell ihr Stand ist. Sobald wieder eine Verbindung besteht, holt Stale-While-Revalidate Raum- und Zeitänderungen automatisch nach.
