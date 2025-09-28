# To-Do List

## Back-End

### Struktur
Die API verwendet Node.js und Express.js also API REST.
Das Back-End liegt im Verzeichnis `./api/`.

- `./src/server.js` hat die verschiedenen Wege der API (GET, POST, PATCH und DELETE).
- `./src/index.js` hört den Server mit app.listen() zu.
- `./src/readingWritingDatabase.js` ist die Verwaltung der JSON-Dateien.
- `./src/swagger.yaml` ist die API-Dokumentation ([Link der API-Dokumentation](#Back-End-Deployment)).

### Installation
Um die Pakete zu installieren oder zu aktualisieren: `npm install`.

### Entwicklermodus
Im Entwicklermodus starten: 
```
cd api
npm start
```

Die API liegt auf `localhost:3000`.  
Ausnahme für den Render-Server, gibt es einen einzigartigen Link ([Back-End Deployment sehen](#Back-End-Deployment)).

### Funktionen
Die Verwaltung der Aufgaben liegt in `/tasks`.

#### Aufgabe
Eine Aufgabe (task) ist ein Objekt mit:

- Ein verpflichteter Titel (title) mit maximum 100 Zeichen.
- Eine optionale Beschreibung (description) mit maximum 500 Zeichen und erhält keinen JavaScript-Code.
- Ein Status zwischen `Zu tun` (todo), `Laufend` (in-progress) und `Fertig` (done).

#### Funktionalität
- `GET /tasks`, gibt die Liste der Aufgaben zurück
- `POST /tasks`, erstellt eine neue Aufgabe
- `PATCH /tasks:id`, aktualisiert der Status der Aufgabe mit der id
- `DELETE /tasks:id`, löscht eine Aufgabe mit der id

### Datenbank (JSON)
Ich habe das Format JSON um die Aufgaben zu behalten gewählt, weil dieses Format einfacher ist.  
Für ein kleines Projekt mit einer einzigen Tabelle und 4 Datentypen (ID, Titel, Beschreibung und Status) ist JSON genug.

SQL ist möglich aber ich sollte einen SQL-Server für die Datenbank haben und eine JS-Bibliothek um die Dateien zu lesen verwenden.

Es gibt zwei Dateien zum Speichern der Aufgaben:

- `tasks.json` liegt in `./api/src/` um die Aufgaben der Web-Applikation zu verwalten
- `tasks.test.json` liegt in `./api/test/` um die Dateien server.js und readingWritingDatabase in `./api/src/` zu testen

### Test
Um die Tests auszuführen: 
```
cd api
npm run test
```

Das Coverage Report liegt im Verzeichnis `./coverage/`.

Für die Tests liegen sie im Verzeichnis `./api/test`:

- `./test/readingWritingDatabase.test.js` testet die verschiedenen Funktionen um eine JSON-Datei zu lesen oder zu schreiben.
- `./test/server.test.js` testet die verschiedenen Wege der API (GET, POST, PATCH und DELETE).

### Back-End-Deployment
Ich verwende Render für das Deployment des Back-Ends.

- Das Link: https://todolist-181m.onrender.com](https://todolist-181m.onrender.com).
- Das Link um die Aufgaben lesen: [https://todolist-181m.onrender.com/tasks](https://todolist-181m.onrender.com/tasks).
- Das Link der API-Dokumentation mit Swagger: [https://todolist-181m.onrender.com/api-docs](https://todolist-181m.onrender.com/api-docs).

GitHub Actions überprüft, wenn es ein Problem mit dem Back-End-Deployment gibt.

---

## Front-End

### Struktur
Die Applikation verwendet das Framework React mit Typescript und die Grafikbibliothek Material UI.  
Das Front-End liegt im Verzeichnis `./app/`:

- `./src/api.ts` erhält alle Daten der API im Back-End.
- `./src/App.tsx` stellt die Web-Applikation dar.
- `./src/components/taskList.tsx` stellt die Liste der verschiedenen Aufgaben dar, die im Verzeichnis `./api/src/tasks.json`.
- `./src/components/taskForm.tsx` stellt das Formular um eine Aufgabe zu erstellen dar.

### Installation
Um die Pakete zu installieren oder zu aktualisieren: 
```
cd app
npm install
```

### Entwicklermodus
Im Entwicklermodus starten: 
```
cd app
npm run dev
```
Die Web-Applikation liegt auf `localhost:5173`.
Ausnahme für den Render-Server, gibt es einen einzigartigen Link ([Front-End Deployment sehen](#Front-End-Deployment)).

> ACHTUNG: Der Back-End Server muss auf `localhost:3000` starten. Andernfalls können keine Aufgaben geladen oder gespeichert werden. 

### Build
Um einen Build zu erstellen: 
```
cd app
npm run build
```

### Front-End-Deployment
Ich verwende Vercel für das Deployment des Front-Ends.

- Das Link um die Applikation sehen: [https://to-do-list-rho-snowy-75.vercel.app/](https://to-do-list-rho-snowy-75.vercel.app/)

GitHub Actions überprüft, wenn es ein Problem mit dem Back-End-Deployment gibt.  

## Workflows

Die Workflows ermöglichen überprüfen, wenn das Programm automatisch funktioniert.
Alle workflows liegt in der `./.github/workflows/ci.yaml/`.

Es gibt 3 Workflows:
- Back-End Deployment Workflow 
- Front-End Deployment Workflow
- Vercel Workflow (Verwaltung mit der Vercel-Website)

Es gibt auch ein Workflow mit Render, aber Github zeigt es nicht an.