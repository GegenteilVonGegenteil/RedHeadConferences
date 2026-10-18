# Branding

## Team: Readheads
## Plattformname: Redhead Conferences

### Markenkonzept
 Redhead Conferences richtet sich an junge Erwachsene im Alter zwischen 18 und 25 Jahren und soll sich durch einen modernen, einprgsamen Auftritt von einer generischen Konferrenzplattform abheben. Eine klare Seitenstruktur wird mit einer kräftigen roten Markenfarbe und gezielten grafischen Akzenten erzielt, die der Plattform einen wiedererknnbaren Charakter geben. Das Rot knüpft an den Plattformnamen an und dient als visuelle Eselsbrücke, durch die Nutzer:innen die Website leichter wiedererkennen können. Dies sichert Marktsichtbarkeit und Präsenz in den Köpfen der Nutzer:innen.

### Begründung Design Tokens Architektur
Unsere Design Tokens sind in primitive und semantische Werte unterteilt. Die primitiven Tokens enthalten konkrete Rohwerte wie beispielsweise --blue900 oder --space-6. Die semantischen Tokens hingegen beschreiben wofür ein Wert verwendet wird, wie zum Beispiel --color-text-primary oder - - spacing-card-padding.

1. Theming Erweitbarkeit: Alle Komponenten verwenden sowohl für den Standardmodus als auch den dunklen Modus stabile semantische Namen. Im Darkmode werden diese Namen in :root[data-theme=“dark“] anderen primitiven Werten zugeordnet. Dadurch müssen Komponenten keine eigenen Darkmode-Variablen verwenden und der Themewechsel kann stattfinden, ohne die Farbenkomponenten umzubauen.
2. Konsistenz: Die semantischen Design Tokens verweisen auf eine gemeinsame Spacing- und Typografieskala. Dadurch können wiederkehrende Elemente dieselben vordefinierten Abstände und Schriftgrößen nutzen. Das Interface bleibt einheitlich und Abweichungen sind somit leichter erkennbar.
3. Lesbarkeit: Rollen wie Pimärtext, Link, Surface und Fokus sind klar benannt. Dies hilft dabei zu überprüfen, ob Farbpaare ausreichend Kontrast aufweisen. Die Farben wurden daher nicht nur nach ihrem Aussehen, sondern auch aufgrund ihrer Funktionalität gewählt.
4. Wartbarkeit: Änderungen bei der Farbe oder den Abständen sind mit geringem Arbeitsaufwand verbunden. Der primitive Farbwert kann geändert werden, ohne jede Komponente einzeln zu bearbeiten. Semantische Design Tokens machen außerdem sichtbar welche Rolle ein Wert im Interface hat. 