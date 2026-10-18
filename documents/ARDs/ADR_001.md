# Technologieentscheidung - Project Setup 

## Kontext
Die Plattform **Redhead Conferences** zeigt das Konferenzprogramm **FrontendNow**. Sie benötigt mehrere Seitentypen, unter anderem eine Sessionübersicht, Detailansichten der einzelnen Sessions und ein persönliches Dashboard für "Mein Programm".
Das Projekt wird mit Vue umgesetzt. Für das Setup stehen Nuxt oder Vue + Vite + Vue Router zur Verfügung. Folgende Projektpunkte müssen berücksichtig werden:
- eine passende Projektstruktur
- der Aufwand für die Einrichtung
- eine Möglichkeit weitere Seiten übersichtlich zu ergänzen

## Optionen
1. Nuxt: Nuxt baut auf Vue auf und bietet eine vorgegebene Projektstruktur sowie dateibasiertes Routing. Seiten im pages-Ordner werden automatisch als Routen erkannt. Außerdem kann auf integrierte Funktionen und Konventionen zugegriffen werden, die den Einstieg in ein neues Projekt vereinfachen.
2. Vue + Vite + Vue Router: Bei diesem Setup wird Vue, das Entwickugs- und Buildwerkzeug Vite, sowie der Router separat eingerichtet. Routen und zugehörige Komponenten werden explizit konfiguriert. Diese Option gibt uns mehr Freiheit bei der Struktur, erfordert aber zeigleich zusätzliche Einrichtung und eigene Festlegungen.

## Entscheidung
Wir haben uns für Nuxt entschieden. Kaja ist mit dem konzeptionell ähnlichen Programm „Next“ sehr vertraut. Diese Erfahrung kann den Einstieg in die Arbeit mit einem Framework erleichtern. Nuxt bringt jedoch auch eigene Konzepte mit, in die wir uns einarbeiten müssen. Da wir Vue bereits aus Vorlesungen und vorherigen Aufgaben kennen, können wir darauf aufbauen und zugleich Nuxt kennenlernen. Der Umgang mit verschiedenen Frameworks kann auch für zukünftige Projekte nützlich sein.
Zusammenfassend lässt sich sagen, dass Nuxt uns die gewünschte Projektstruktur und integrierten Funktionen zur Verfügung stellt, mit denen sich Übersichten, Detailansichten und ein persönliches Dashboard umsetzen lassen.

## Konsequenzen
Wir orientieren unsere Orderstruktur an den Nuxt-Konventionen und legen Seiten als Dateien im pages-Ordner an. Neue Seiten werden dadruch automatisch in die Routenstruktur aufgenommen. Im Gegenzug müssen wir die Nuxt-spezifischen Konventionen kennenlernen und bei der Umsetzung einheitlich anwenden. Wir dokumentieren die benötigten Setup- und Startbefehle in der beigefügten README-Datei.