# Renderingstrategie für Redhead Conferences

## Status
Approved

## Allgemeine Auswahlkriterien

Redhead Conferences zeigt das Programm der Konferenz FrontendNow. Bei der Auswahl der Renderingstrategie berücksichtigen wir, wie häufig sich Inhalte ändern und ob sie für alle Besucher:innen gleich sind. Die Speaker:innenprofile enthalten weitgehend unveränderte Informationen, während sich Zeiten und Räume einzelner Sessions während der Konferenz ändern können. Das persönliche Programm unterscheidet sich hingegen je nach Benutzer:in und wird im Browser gespeichert. Zusätzlich achten wir darauf, dass die gewählte Strategie mit Nuxt umsetzbar ist und zu unserem Projektumfang passt. Unsere gemeinsame Datenbasis bleibt die conference-data.json. Da kein echtes Live-Backend erforderlich ist, simulieren wir Änderungen am Zeitplan und dokumentieren deren Umsetzung sowie die damit verbundenen Einschränkungen.

## 1. Speaker:innenprofile

### Kontext

Redhead Conferences zeigt die Profile von 18 Speaker:innen, die jeweils ihren Namen, beruflichen Titel, ihre Firma sowie ihre Biografie enthalten. Zusätzlich verlinken wir die Sessions, an denen die jeweilige Person beteiligt ist. Diese Informationen sind öffentlich und für alle Besucher:innen gleich. Wir gehen davon aus, dass sich die Profiltexte während der Konferenz nicht ändern. Zeit und Raum einer Session werden auf den zugehörigen Sessionseiten angezeigt.

### Optionen

Wir haben SSG und ISR betrachtet. Bei SSG werden die Profile bereits beim Build erzeugt und anschließend als fertige Seiten ausgeliefert. Änderungen an den Profilen benötigen einen neuen Build. Bei ISR wird SSG um periodische Regeneration der Profile erweitert, womit potenzielle Änderungen übernommen werden könnten, ohne die gesamte Applikation neu builden zu müssen.

### Entscheidung

Wir entscheiden uns für **SSG**, da alle Speaker:inneninformationen vollständig in unserer conference-data.json vorliegen und weitgehend unverändert bleiben. ISR verwerfen wir, weil wir aktuell nicht annehmen, dass sich die Speaker:inneninformationen regelmäßig genug ändern würden, um diese Alternative sinnvoll zu machen.

### Konsequenzen

Beim Build müssen alle 18 Profilrouten erzeugt werden. Wenn wir einen Profiltext ändern, müssen wir die Anwendung erneut bauen und veröffentlichen. Die Links zu den gehaltenen Sessions bleiben Bestandteil der Profile. Aktuelle Zeitplaninformationen werden auf den zugehörigen Sessionseiten bereitgestellt. Problematisch könnte es werden, wenn die Session-Informationen geändert werden (z.B. Titel, Raum, Zeit) und dies nicht in den Profilen reflektiert wird.

## 2. Sessiondetailseiten

### Kontext

Für jede der 20 Sessions gibt es eine eigene Detailseite, die Titel, Abstract, Tag, Startzeit, Endzeit, Raum, Track, Level und Format sowie Links zu den beteiligten Speaker:innen enthält. Während einer Konferenz können sich insbesondere Zeiten und Räume ändern. Jedoch erwarten wir aktuell keine Veränderungen, die in Echtzeit angezeigt werden müssen (z.B. Last-Minute-Änderungen oder Verschiebungen). Besucher:innen sollen trotzdem halbwegs aktuelle Daten bekommen, um ihren Besuch der Konferenz sinnvoll planen zu können. Die Informationen sind öffentlich und für alle Besucher:innen gleich.

### Optionen

Wir haben SSG, ISR und SSR verglichen. SSG würde die Detailseiten beim Build erzeugen, was gut zu unserem derzeit festen Datensatz passt. Eine Änderung am Zeitplan wäre allerdings erst nach einem neuen Build und einer erneuten Veröffentlichung sichtbar. Bei ISR wird SSG um periodische Regeneration der Seite erweitert, womit Änderungen im Zeitplan regelmäßig übernommen werden. SSR könnte auch in Betracht gezogen werden, sollten wir Änderungen in Echtzeit aktualisieren wollen.

### Entscheidung

Wir wählen **ISR**, da wir mögliche Änderungen am Zeitplan berücksichtigen möchten. Alle Besucher:innen sehen den gleichen Inhalt und die Routen und Daten sind zur Buildzeit bekannt. SSG verwerfen wir für diesen Anwendungsteil, weil Aktualisierungen sonst an einen neuen Build gebunden wären. SSR würde bei jedem Aufruf neu rendern, obwohl Änderungen selten sind und keine Echtzeitanzeige nötig ist.

### Konsequenzen

Die Anwendung benötigt eine Serverlaufzeit (hier rein konzeptuell/simuliert), was das Hosting der Seite aufwendiger macht als eine rein statische Seite. Zudem akzeptieren wir, dass Benutzer:innen veraltete Daten sehen könnten, was je nach Szenario für sie Probleme oder Verwirrung sorgen könnte. Bereits geöffnete Seiten werden nicht aktualisiert. Dies ist aktuell ein Kompromiss, den wir akzeptieren, da es für unsere aktuellen Anforderungen und Funktionalitäten weiterhin mehr Vorteile mit sich bringt als die Alternativen.

## 3. Sessionübersicht mit Filtern

### Kontext

Die Sessionübersicht zeigt alle 20 Sessions der FrontendNow, die nach Track, Konferenztag und Level gefiltert werden können. Die Filter sind kombinierbar, wobei eine Session alle ausgewählten Bedingungen erfüllen muss. Zusätzlich enthält die Übersicht Zeitplanangaben sowie Links zu den Detailseiten. Beide Ansichten sollen denselben Datenstand verwenden, damit Besucher:innen keine widersprüchlichen Informationen erhalten.

### Optionen

Wir haben SSG, ISR und SSR betrachtet. Bei SSG wird die Übersicht beim Build erzeugt und anschließend im Browser interaktiv gefiltert. Änderungen am Zeitplan erscheinen jedoch erst nach einem neuen Build. Bei ISR wird SSG um periodische Regeneration der Seite erweitert, womit Änderungen im Zeitplan regelmäßig übernommen werden. Bei SSR wird die Übersicht bei einer Anfrage auf dem Server erzeugt, wodurch sie denselben aktuellen Datenstand wie die Sessiondetailseiten verwenden kann.

### Entscheidung

Wir wählen **ISR** für die anfängliche Darstellung der Übersicht. Die Filterung erfolgt anschließend im Browser. Dies passt auch zu unserer Entscheidung der Renderingmethode für die Sessiondetail-Seiten. SSG verwerfen wir, weil die Übersicht sonst einen älteren Zeitplan als die Detailseiten anzeigen könnte. SSR ist wie bei den Detailseiten für unsere aktuellen Ansprüche weniger zutreffend.

### Konsequenzen

Die Übersicht und die Detailseiten verwenden dieselbe zentrale Datenschicht sowie dieselbe Simulation von Zeitplanänderungen. Die Filterlogik liegt in einem eigenen Composable. Da alle Sessions bereits geladen sind, benötigen Änderungen an den Filtern keine zusätzliche Serveranfrage. Für den Betrieb wird eine Serverlaufzeit benötigt. Wie bei den Detailseiten nehmen wir in Kauf, dass Benutzer:innen leicht veraltete Daten sehen werden.

## 4. Mein Programm

### Kontext

Die Seite „Mein Programm“ zeigt die Sessions, die ein:e Besucher:in persönlich gespeichert hat. Diese Auswahl unterscheidet sich zwischen Benutzer:innen. Gemäß unserem bestehenden Konzept speichern wir nur die Session-IDs im localStorage, während die vollständigen Sessioninformationen weiterhin über useConferenceData() bereitgestellt werden. Der Server kann die gespeicherten Daten des jeweiligen Browsers nicht direkt auslesen.

### Optionen

Wir haben CSR und SSR verglichen. Bei CSR wird das persönliche Programm im Browser aufgebaut, wo die gespeicherten IDs gelesen und den Konferenzdaten zugeordnet werden können. Bei SSR müsste die persönliche Auswahl bereits auf dem Server verfügbar sein. Dafür wäre eine zusätzliche Übertragung oder Speicherung erforderlich.

### Entscheidung

Wir wählen **CSR**, weil diese Strategie zu unserer lokalen Speicherung ohne Benutzer:innenkonto passt. SSR verwerfen wir, da der Server keinen direkten Zugriff auf den localStorage hat und wir keine zusätzliche serverseitige Speicherung einführen möchten.

### Konsequenzen

Die Seite zeigt zunächst einen Ladezustand und liest anschließend die gespeicherten IDs über useMyProgram() ein. Erst danach werden Änderungen gespeichert, damit die vorhandene Auswahl nicht versehentlich durch eine leere Liste ersetzt wird. Die Auswahl bleibt nach einem Reload erhalten, gilt jedoch nur für den jeweiligen Browser. Ungültige gespeicherte IDs werden abgefangen.
