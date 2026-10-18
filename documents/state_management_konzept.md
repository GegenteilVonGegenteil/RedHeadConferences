# State-Management-Konzept


## Kontext
Für unsere Plattform werden hauptsächlich zwei States verwendet. Zum einen den allgemeinen, unveränderlichen Konferenzdatensatz (`conference-data.json`), zum anderen das für den User spezifische, in LocalStorage gespeicherte `myProgram` (`useMyProgram()`). Beide werden in Komponenten gehandhabt, z.B. in `SessionCards` in einer Liste oder in Buttons, um die Sessions zum Programm hinzuzufügen.


## Konferenzdaten
<u>Composable:</u> `useConferenceData()`
<u> Geladen: </u> beim Build


Das JSON liegt im `app/data/` Ordner und wird in das Composable importiert. Die Daten sind dabei read-only und müssen nur einmal geladen werden. Im Composable liegen dann der Datensatz und verschiedene Lookup-Funktionen, die von Komponenten verwendet werden können.


## Mein Programm
<u>Composable:</u> `useMyProgram()`
<u> Geladen: </u> `onMounted()`


In `myProgram` werden alle hinzugefügten Session-Ids gespeichert, anstatt die gesamten Sessions zu speichern. Dies hat den Vorteil einer kleineren Payload, dass Änderungen im Programm nicht zusätzlich gehandhabt werden müssen und dass `useConferenceData()` weiterhin als Single Source of Truth gilt. Im Composable werden zudem Funktionen zum Hinzufügen, zum Entfernen, zum Nachschauen, ob eine Session bereits gespeichert ist, und zum Toggling sowie eine Lookup-Funktion, die eine Liste aller enthaltenen Sessions gibt (und dabei `useConferenceData` benutzt).


### Persistenz & Rehydration
`myProgram` liegt in einem `useState()`. Wir nutzen `useState()` über `ref()`, da es bei letzteren zu einem State-Leak kommen kann. LocalStorage kann nur auf der Client-Seite genutzt werden. Deswegen setzen wir `myProgram` vorerst auf ein leeres Array und `isHydrated` auf `false`. In `onMounted()` werden dann die eigentlichen Ids aus dem localStorage geladen. Erst dann wird `isHydrated` auf `true` gesetzt. Mit `watch` wird auf Änderungen des Arrays geachtet und in localStorage gespeichert. Dies geschieht aber erst nach der Hydration, um nicht das leere Array zu speichern. Zudem werden vor der Hydration in den state-abhängigen Komponenten Platzhalter genutzt.


### Verteilung Komponenten
Die allgemeinen Sessions, Sessions-Detail und Speaker-Seite verwenden vorwiegend useConferenceData, um die zu rendernden Daten zu fetchen. Buttons zum hinzufügen/entfernen einer Session zum Programm nutzen die toggle Funktion von useMyProgram, bzw benutzen für den Conditional-Render einen check ob eine Session bereits hinzugefügt wurde. Die Seite MyProgram nutzt wiederum useMyProgram für die Liste, die Toggle-Funktion und das Conditional-Rendering

## Diagramm
![State Diagramm zu Build, Client Start und Interaktion](StateDiagram.png)