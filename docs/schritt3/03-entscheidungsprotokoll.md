
# Entscheidungsprotokoll – Schritt 3: PWA & Offline-Strategie

## ADR-003: Offline-Verfügbarkeit der Konferenzplattform

- Projekt: Redhead Conferences – FrontendNow
- Datum: 25.11.2026
- Status: Approved
- Verantwortlich: Projektteam

## 1. Kontext und Problemstellung

Die Konferenzplattform FrontendNow soll auch bei eingeschränkter
oder fehlender Internetverbindung nutzbar bleiben. Insbesondere
während einer Konferenz kann es durch ausgelastete WLAN-Netzwerke
oder instabile Mobilfunkverbindungen zu Verbindungsproblemen kommen.

Besucher:innen sollen weiterhin auf das Konferenzprogramm,
Session-Details, Speaker-Informationen und ihr persönliches
Programm zugreifen können.

Gleichzeitig müssen Änderungen am Konferenzprogramm, beispielsweise
Raumwechsel oder geänderte Beginnzeiten, bei verfügbarer
Internetverbindung berücksichtigt werden.

Die in Schritt 2 getroffenen Rendering-Entscheidungen werden
deshalb durch eine ergänzende Offline- und Caching-Strategie
erweitert.

## 2. Zusammenhang mit den Rendering-Entscheidungen aus Schritt 2

| Bereich | Rendering-Strategie | Begründung |
| --- | --- | --- |
| Startseite | SSG | Überwiegend statische Inhalte, schnelle Bereitstellung |
| Session-Übersicht | ISR | Konferenzprogramm mit gelegentlichen Änderungen |
| Session-Detailseiten | ISR | Möglichkeit zur Aktualisierung von Zeiten und Räumen |
| Speaker-Detailseiten | SSG | Überwiegend stabile Informationen |
| Mein Programm | CSR | Individuelle, lokal gespeicherte Auswahl |

Für die Session-Seiten ist in der Nuxt-Konfiguration ein
ISR-Intervall von 300 Sekunden vorgesehen. Die tatsächliche
serverseitige Revalidierung hängt von der Deployment-Umgebung ab.

Die Rendering-Strategien allein gewährleisten noch keine
Offline-Verfügbarkeit. Dafür werden zusätzlich ein Service Worker,
Precache und Runtime-Caching eingesetzt.

## 3. Betrachtete Alternativen

### Cache First

Bei Cache First wird zunächst geprüft, ob eine Ressource bereits
im Cache vorhanden ist. Nur wenn kein Cache-Eintrag existiert,
wird eine Netzwerkanfrage durchgeführt.

Diese Strategie bietet kurze Ladezeiten und eine hohe
Offline-Verfügbarkeit. Für veränderliche Konferenzdaten besteht
jedoch das Risiko, dass veraltete Informationen angezeigt werden.

### Network First

Bei Network First wird zunächst versucht, die aktuellen Daten
über das Netzwerk abzurufen. Falls dies nicht möglich ist,
wird auf den Cache zurückgegriffen.

Diese Strategie priorisiert die Aktualität der Informationen.
Bei instabilen Verbindungen können jedoch zusätzliche
Wartezeiten entstehen.

### Stale-While-Revalidate

Bei Stale-While-Revalidate werden bereits gespeicherte Daten
direkt aus dem Cache bereitgestellt. Parallel wird versucht,
eine aktuelle Version über das Netzwerk abzurufen.

Bei erfolgreicher Netzwerkanfrage wird der Cache aktualisiert.
Die aktualisierten Daten können bei einem nachfolgenden Abruf
verwendet werden.

Diese Strategie verbindet schnelle Verfügbarkeit mit einer
regelmäßigen Aktualisierung der gespeicherten Daten.

## 4. Getroffene Entscheidung

Für die Konferenzplattform wird eine kombinierte
Caching-Strategie eingesetzt.

| Ressource | Strategie |
| --- | --- |
| App Shell und statische Build-Ressourcen | Precache |
| Statische Assets, Icons und Schriftarten | Cache-orientierte Bereitstellung |
| Session- und Speaker-Daten | Stale-While-Revalidate |
| Persönliches Programm | LocalStorage |

Die Konferenzdaten werden über den gemeinsamen API-Endpunkt
`/api/conference` bereitgestellt und im Runtime-Cache
`redhead-conference-data` gespeichert.

Dadurch können Session- und Speaker-Informationen auch ohne
aktive Internetverbindung abgerufen werden, sofern die
notwendigen Ressourcen zuvor gespeichert wurden.

Ein sichtbarer Datenstand informiert die Nutzer:innen über
den Zeitstempel der bereitgestellten Konferenzdaten.

Die persönliche Session-Auswahl wird unabhängig vom
Runtime-Cache unter dem Schlüssel `myProgram` im LocalStorage
gespeichert.

## 5. Bewertung anhand konkreter Nutzungsszenarien

### Szenario 1: Konferenzprogramm bei einem Verbindungsausfall

Eine Besucherin öffnet das Konferenzprogramm vor Beginn der
Veranstaltung mit bestehender Internetverbindung. Während der
Konferenz fällt die WLAN-Verbindung aus. Dank der zuvor
gespeicherten Konferenzdaten kann sie weiterhin auf die
Session-Übersicht zugreifen, Sessions nach Track, Konferenztag
und Level filtern sowie Session- und Speaker-Detailseiten
aufrufen. Stale-While-Revalidate stellt die vorhandenen Daten
aus dem Cache bereit, während die parallele Netzwerkanfrage
fehlschlägt. Der sichtbare Datenstand ermöglicht eine
Einschätzung der Aktualität. Gegenüber Network First werden
Wartezeiten durch den fehlgeschlagenen Netzwerkzugriff
reduziert. Ein Nachteil besteht darin, dass kurzfristige
Raumänderungen ohne Internetverbindung nicht berücksichtigt
werden können. Nach einem erneuten erfolgreichen Datenabruf
kann der Cache aktualisiert werden.

### Szenario 2: Persönliches Programm ohne Internetverbindung

Ein Besucher stellt sich vor der Konferenz ein persönliches
Programm aus mehreren Sessions zusammen. Während der
Veranstaltung entscheidet er sich spontan für einen anderen
Vortrag, obwohl keine Internetverbindung verfügbar ist.
Durch die Speicherung der ausgewählten Session-IDs im
LocalStorage kann er Sessions hinzufügen oder entfernen,
ohne dass eine Serveranfrage notwendig ist. Die zugehörigen
Session-Informationen stehen über die gespeicherten
Konferenzdaten zur Verfügung. Auch nach einem erneuten Laden
der Anwendung bleiben die lokal gespeicherten Auswahlen
grundsätzlich erhalten. Falls zunächst die Startseite
angezeigt wird, ist eine erneute Navigation zum persönlichen
Programm erforderlich. Eine serverseitige Speicherung wurde
für diesen Anwendungsfall nicht gewählt, da sie zusätzliche
Synchronisationsmechanismen erfordern würde.

### Szenario 3: Erstmaliger Aufruf ohne Internetverbindung

Eine Person versucht, die Konferenzplattform erstmals ohne
Internetverbindung zu öffnen. Da zuvor weder die Anwendung
geladen noch ein Service Worker installiert oder ein Cache
aufgebaut wurde, stehen keine lokalen Ressourcen zur
Verfügung. Die Anwendung kann in diesem Fall nicht
bereitgestellt werden. Der Browser zeigt stattdessen seine
standardmäßige Offline-Fehlerseite an. Dieses Verhalten
entspricht den technischen Grenzen einer Progressive Web App.
Auch alternative Caching-Strategien könnten einen vollständig
fehlenden Cache nicht ersetzen. Voraussetzung für die
Offline-Nutzung ist daher mindestens ein erfolgreicher
Online-Aufruf mit abgeschlossener Speicherung der benötigten
Ressourcen. Eine eigene Offline-Fallback-Seite wäre erst
nach einer vorherigen Installation des Service Workers
verfügbar.

## 6. Konsequenzen der Entscheidung

### Vorteile

- Schneller Zugriff auf bereits gespeicherte Konferenzdaten.
- Offline-Verfügbarkeit zentraler Anwendungsfunktionen.
- Filterung und Navigation ohne aktive Internetverbindung.
- Lokale Bearbeitung des persönlichen Programms.
- Aktualisierung des Daten-Caches bei erfolgreichem Netzwerkabruf.
- Transparenz durch Anzeige des Datenstands.

### Nachteile und Einschränkungen

- Ein erstmaliger Aufruf ohne Internetverbindung ist nicht möglich.
- Gespeicherte Konferenzdaten können vorübergehend veraltet sein.
- Änderungen im LocalStorage sind auf den jeweiligen Browser
  und das jeweilige Gerät beschränkt.
- Das Löschen der Browserdaten entfernt auch lokale Auswahlen.
- Fehlgeschlagene Hintergrundanfragen und Nuxt-Payload-Anfragen
  können im Offline-Modus Konsolenfehler verursachen.
- Bei einem Offline-Reload kann zunächst die Startseite
  erscheinen, sodass eine erneute Navigation erforderlich ist.
- Ein aktualisierter Zeitstempel allein beweist noch keine
  inhaltliche Änderung der Konferenzdaten.

## 7. Verifikation und Cross-Review

Die gewählte Strategie wurde anhand manueller Online- und
Offline-Tests in Google Chrome überprüft.

Die Tests umfassen die Registrierung des Service Workers,
die Speicherung der Konferenzdaten im Cache, die Offline-Nutzung
der Session- und Speaker-Seiten sowie die lokale Speicherung
und Bearbeitung des persönlichen Programms.

Die Ergebnisse und zugehörigen Screenshots sind im
[Verifikationsnachweis](04-verifikations-nachweis.md)
dokumentiert.

| Aufgabe | Status |
| --- | --- |
| Technische Umsetzung der Daten-Caching-Strategie | Abgeschlossen |
| Eigene manuelle Offline-Tests | Durchgeführt |
| Dokumentation der Testergebnisse | Erstellt |
| Unabhängige Tests durch das zweite Teammitglied | Durchgeführt |
| Gegenseitiges Cross-Review | Offen |
| Gemeinsame Freigabe des Entscheidungsprotokolls | Offen |
