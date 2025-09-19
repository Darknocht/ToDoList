<h1>Back-End</h1>
<h2>Struktur</h2>
<p>Das Back-End liegt im Verzeichnis "./api/"</p>
<ul>
    <li>"./src/server.js" hat die verschiedenen Wege der API (GET, POST, PATCH und DELETE).</li>
    <li>"./src/index.js" hört den Server mit app.listen() zu.</li>
    <li>"./src/readingWritingDatabase.js" ist die Verwaltung der JSON-Dateien.</li>
    <li></li>
</ul>
<h2>Datenbank (JSON)</h2>
<p>Ich habe das Format JSON um die Aufgaben zu behalten gewählt, weil dieses Format einfacher ist.
Für ein kleines Projekt mit einer einzigen Tabelle und 4 Datentypen (ID, Titel, Beschreibung und Status) ist JSON genug.</p>
<p>SQL ist möglich aber ich sollte einen SQL-Server für die Datenbank haben und eine JS-Bibliothek um die Dateien zu lesen verwenden.</p>
<p>Es gibt zwei Dateien zum Speichern der Aufgaben:</p>
<ul>
    <li>tasks.json liegt in "./api/src/" um die Aufgaben der Web-Applikation zu verwalten</li>
    <li>tasks.test.json liegt in "./api/test/" um die Dateien server.js und readingWritingDatabase in "./api/src/" zu testen</li>
</ul>
<h2>Test</h2>
<p>Das Coverage Report liegt im Verzeichnis "./coverage/".</p>
<p>Für die Tests liegen sie im Verzeichnis "./test":</p>
<ul>
    <li>"./test/readingWritingDatabase.test.js" testet die verschiedenen Funktionen um eine JSON-Datei zu lesen oder zu schreiben.</li>
    <li>"./test/server.test.js" testet die verschiedenen Wege der API (GET, POST, PATCH und DELETE).</li>
</ul>