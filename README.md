<h1>Back-End</h1>
<h2>Struktur</h2>
<p>Die API verwendet Node.js und Express.js also API REST</p>
<p>Das Back-End liegt im Verzeichnis "./api/"</p>
<ul>
    <li>"./src/server.js" hat die verschiedenen Wege der API (GET, POST, PATCH und DELETE).</li>
    <li>"./src/index.js" hört den Server mit app.listen() zu.</li>
    <li>"./src/readingWritingDatabase.js" ist die Verwaltung der JSON-Dateien.</li>
</ul>
<h2>Installation</h2>
<p>Um die Pakete zu installieren oder zu aktualisieren: "npm install"</p>
<h2>Entwicklermodus</h2>
<p>Im Entwicklermodus starten: "npm run dev"</p>
<p>Die API liegt auf "localhost:3000"</p>
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
<p>Um die Tests auszuführen: "npm run test"</p>
<p>Das Coverage Report liegt im Verzeichnis "./coverage/".</p>
<p>Für die Tests liegen sie im Verzeichnis "./test":</p>
<ul>
    <li>"./test/readingWritingDatabase.test.js" testet die verschiedenen Funktionen um eine JSON-Datei zu lesen oder zu schreiben.</li>
    <li>"./test/server.test.js" testet die verschiedenen Wege der API (GET, POST, PATCH und DELETE).</li>
</ul>
<h2>Deployment</h2>
<h1>Back-End</h1>
<h2>Struktur</h2>
<p>Die Applikation verwendet das Framework React mit Typescript und die Grafikbibliothek Material UI</p>
<p>Das Front-End liegt im Verzeichnis "./app/":</p>
<ul>
    <li>"./src/api.ts" erhält alle Daten der API im Back-End.</li>
    <li>"./src/App.tsx" stellt die Web-Applikation dar.</li>
    <li>"./src/components/taskList.tsx" stellt die Liste der verschiedenen Aufgaben dar, die im Verzeichnis "./api/src/tasks.json".</li>
    <li>"./src/components/taskForm.tsx" stellt das Formular um eine Aufgabe zu erstellen dar.</li>
</ul>
<h2>Installation</h2>
<p>Um die Pakete zu installieren oder zu aktualisieren: "npm install"</p>
<h2>Entwicklermodus</h2>
<p>Im Entwicklermodus starten: "npm run dev"</p>
<p>Die Web-Applikation liegt auf "localhost:5173"</p>
<p>Achtung: Der Back-End Server muss auf "localhost:3000" starten</p>
<h2>Build</h2>
<p>Um einen Build zu erstellen: "npm run build"</p>
<h2>Deployment</h2>