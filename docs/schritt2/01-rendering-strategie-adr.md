# Renderingstrategie für Redhead Conferences

## Status
Vorschlag - Freigabe durch beide Teammitglieder notwendig
Vorschlag - Gendern mit :

## Allgemeine Auswahlkriterien

Redhead Conferences zeigt das Programm der Konferenz FrontendNow. Bei der Auswahl der Renderingstrategie berücksichtigen wir, wie häufig sich Inhalte ändern und ob sie für alle Besucher:innen gleich sind. Die Speaker:innenprofile enthalten weitgehend unveränderte Informationen, während sich Zeiten und Räume einzelner Sessions während der Konferenz ändern können. Das persönliche Programm unterscheidet sich hingegen je nach Benutzer:in und wird im Browser gespeichert. Zusätzlich achten wir darauf, dass die gewählte Strategie mit Nuxt umsetzbar ist und zu unserem Projektumfang passt. Unsere gemeinsame Datenbasis bleibt die conference-data.json. Da kein echtes Livebackend erforderlich ist, simulieren wir Änderungen am Zeitplan und dokumentieren deren Umsetzung sowie die damit verbundenen Einschränkungen.

## 1. Speaker:innenprofile

### Kontext

Redhead Conferences zeigt die Profile von 18 Speaker:innen, die jeweils ihren Namen, beruflichen Titel, ihre Firma sowie ihre Biografie enthalten. Zusätzlich verlinken wir die Sessions, an denen die jeweilige Person beteiligt ist. Diese Informationen sind öffentlich und für alle Besucher:innen gleich. Wir gehen davon aus, dass sich die Profiltexte während der Konferenz nicht ändern. Zeit und Raum einer Session werden auf den zugehörigen Sessionseiten angezeigt.

### Optionen

Wir haben SSG und SSR betrachtet. Bei SSG werden die Profile bereits beim Build erzeugt und anschließend als fertige Seiten ausgeliefert. Änderungen an den Profilen benötigen einen neuen Build. Bei SSR wird die Seite bei einer Anfrage auf dem Server erzeugt, wodurch aktuelle Informationen aus einer veränderlichen Datenquelle eingebunden werden könnten.

### Entscheidung

Wir entscheiden uns für **SSG**, da alle Speaker:inneninformationen vollständig in unserer conference-data.json vorliegen und weitgehend unverändert bleiben. SSR verwerfen wir, weil eine erneute Erzeugung bei jeder Anfrage für diese Inhalte keinen ausreichenden Vorteil bietet.

### Konsequenzen

Beim Build müssen alle 18 Profilrouten erzeugt werden. Wenn wir einen Profiltext ändern, müssen wir die Anwendung erneut bauen und veröffentlichen. Die Links zu den gehaltenen Sessions bleiben Bestandteil der Profile. Aktuelle Zeitplaninformationen werden auf den zugehörigen Sessionseiten bereitgestellt.

## 2. Sessiondetailseiten

### Kontext

Für jede der 20 Sessions gibt es eine eigene Detailseite, die Titel, Abstract, Tag, Startzeit, Endzeit, Raum, Track, Level und Format sowie Links zu den beteiligten Speaker:innen enthält. Während einer Konferenz können sich insbesondere Zeiten und Räume ändern. Besucher:innen sollen deshalb bei einem erneuten Aufruf den aktuellen Stand erhalten. Die Informationen sind öffentlich und für alle Besucher:innen gleich.

### Optionen

Wir haben SSG und SSR verglichen. SSG würde die Detailseiten beim Build erzeugen, was gut zu unserem derzeit festen Datensatz passt. Eine kurzfristige Änderung am Zeitplan wäre allerdings erst nach einem neuen Build und einer erneuten Veröffentlichung sichtbar. SSR erzeugt die Seiten bei einer Anfrage auf dem Server und kann dabei aktuelle Daten berücksichtigen.

### Entscheidung

Wir wählen **SSR**, da wir mögliche Änderungen am Zeitplan berücksichtigen möchten. SSG verwerfen wir für diesen Anwendungsteil, weil Aktualisierungen sonst an einen neuen Build gebunden wären. Für diesen Projektschritt simulieren wir eine Änderung an Zeit oder Raum, ohne ein echtes Livebackend einzurichten.

### Konsequenzen

Die Anwendung benötigt eine Serverlaufzeit. Da der bisherige JSON-Import allein keine veränderlichen Daten bereitstellt, ergänzen wir eine zentrale Simulation, die auch von der Übersicht verwendet wird. Wir prüfen, ob die Änderung bei einem erneuten Seitenaufruf sichtbar ist. Bereits geöffnete Seiten aktualisieren sich durch SSR nicht automatisch.

## 3. Sessionübersicht mit Filtern

### Kontext

Die Sessionübersicht zeigt alle 20 Sessions der FrontendNow, die nach Track, Konferenztag und Level gefiltert werden können. Die Filter sind kombinierbar, wobei eine Session alle ausgewählten Bedingungen erfüllen muss. Zusätzlich enthält die Übersicht Zeitplanangaben sowie Links zu den Detailseiten. Beide Ansichten sollen denselben Datenstand verwenden, damit Besucher:innen keine widersprüchlichen Informationen erhalten.

### Optionen

Wir haben SSG und SSR betrachtet. Bei SSG wird die Übersicht beim Build erzeugt und anschließend im Browser interaktiv gefiltert. Änderungen am Zeitplan erscheinen jedoch erst nach einem neuen Build. Bei SSR wird die Übersicht bei einer Anfrage auf dem Server erzeugt, wodurch sie denselben aktuellen Datenstand wie die Sessiondetailseiten verwenden kann.

### Entscheidung

Wir wählen **SSR** für die anfängliche Darstellung der Übersicht. Die Filterung erfolgt anschließend im Browser. SSG verwerfen wir, weil die Übersicht sonst einen älteren Zeitplan als die Detailseiten anzeigen könnte.

### Konsequenzen

Die Übersicht und die Detailseiten verwenden dieselbe zentrale Datenschicht sowie dieselbe Simulation von Zeitplanänderungen. Die Filterlogik liegt in einem eigenen Composable. Da alle Sessions bereits geladen sind, benötigen Änderungen an den Filtern keine zusätzliche Serveranfrage. Ein erneuter Seitenaufruf kann einen aktualisierten Zeitplan laden. Für den Betrieb wird eine Serverlaufzeit benötigt.

## 4. Mein Programm

### Kontext

Die Seite „Mein Programm“ zeigt die Sessions, die ein:e Besucher:in persönlich gespeichert hat. Diese Auswahl unterscheidet sich zwischen Benutzer:innen. Gemäß unserem bestehenden Konzept speichern wir nur die Session-IDs im localStorage, während die vollständigen Sessioninformationen weiterhin über useConferenceData() bereitgestellt werden. Der Server kann die gespeicherten Daten des jeweiligen Browsers nicht direkt auslesen.

### Optionen

Wir haben CSR und SSR verglichen. Bei CSR wird das persönliche Programm im Browser aufgebaut, wo die gespeicherten IDs gelesen und den Konferenzdaten zugeordnet werden können. Bei SSR müsste die persönliche Auswahl bereits auf dem Server verfügbar sein. Dafür wäre eine zusätzliche Übertragung oder Speicherung erforderlich.

### Entscheidung

Wir wählen **CSR**, weil diese Strategie zu unserer lokalen Speicherung ohne Benutzer:innenkonto passt. SSR verwerfen wir, da der Server keinen direkten Zugriff auf den localStorage hat und wir keine zusätzliche serverseitige Speicherung einführen möchten.

### Konsequenzen

Die Seite zeigt zunächst einen Ladezustand und liest anschließend die gespeicherten IDs über useMyProgram() ein. Erst danach werden Änderungen gespeichert, damit die vorhandene Auswahl nicht versehentlich durch eine leere Liste ersetzt wird. Die Auswahl bleibt nach einem Reload erhalten, gilt jedoch nur für den jeweiligen Browser. Ungültige gespeicherte IDs werden abgefangen.