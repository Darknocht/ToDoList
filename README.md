# To-Do List

## Back-End

### Struktur
Die API verwendet Node.js und Express.js als REST-API.
Das Back-End liegt im Verzeichnis `./api/`.

- `./src/server.js` enthält die verschiedenen Routen der API (GET, POST, PATCH und DELETE).
- `./src/index.js` startet den Server mit `app.listen()`.
- `./src/readingWritingDatabase.js` verwaltet die JSON-Dateien.
- `./src/swagger.yaml` erhält die API-Dokumentation ([siehe API-Dokumentation](#Back-End-Deployment)).

### Installation
Um die Pakete zu installieren oder zu aktualisieren: `npm install`.

### Entwicklermodus
Im Entwicklermodus starten: 
```
cd api
npm start
```

Die API läuft auf `localhost:3000`.  
>Ausnahme: Beim Render-Server gibt es einen eigenen Link ([siehe Back-End Deployment](#Back-End-Deployment)).

### Funktionen
Die Verwaltung der Aufgaben erfolgt über `/tasks`.

#### Aufgabe
Eine Aufgabe (task) ist ein Objekt mit:

- Einem verpflichteten Titel (title) mit maximal 100 Zeichen.
- Einer optionalen Beschreibung (description) mit maximal 500 Zeichen, ohne JavaScript-Code.
- Einem Status zwischen `Zu tun` (todo), `Laufend` (in-progress) und `Fertig` (done).

#### Funktionalität
- `GET /tasks`, gibt die Liste der Aufgaben zurück
- `POST /tasks`, erstellt eine neue Aufgabe
- `PATCH /tasks:id`, aktualisiert den Status der Aufgabe mit der id
- `DELETE /tasks:id`, löscht eine Aufgabe mit der id

### Datenbank (JSON)
Ich habe JSON als Speicherformat für die Aufgaben gewählt, weil es einfacher zu handhaben ist.
Für ein kleines Projekt mit nur einer Tabelle und vier Datentypen (ID, Titel, Beschreibung, Status) reicht JSON völlig aus.

SQL wäre ebenfalls möglich, aber dafür müsste ein SQL-Server installiert werden und eine passende JS-Bibliothek zum Lesen/Schreiben der Daten genutzt werden

Es gibt zwei Dateien zum Speichern der Aufgaben:

- `tasks.json` in `./api/src/` verwaltet die Aufgaben der Web-Applikation
- `tasks.test.json` in `./api/test/` dient zum Testen der Dateien `server.js` und `readingWritingDatabase.js` in `./api/src/` zu testen

### Test
Um die Tests auszuführen: 
```
cd api
npm run test
```

Das Coverage Report liegt im Verzeichnis `./coverage/`.

Die Tests befinden sich im Verzeichnis `./api/test`:

- `./test/readingWritingDatabase.test.js` testet die verschiedenen Funktionen zum Lesen und Schreiben von JSON-Dateien
- `./test/server.test.js` testet die verschiedenen API-Routen (GET, POST, PATCH und DELETE)

### Back-End-Deployment
Für das Deployment des Back-Ends verwende ich Render.

- Das Link: https://todolist-181m.onrender.com](https://todolist-181m.onrender.com).
- Das Link um die Aufgaben lesen: [https://todolist-181m.onrender.com/tasks](https://todolist-181m.onrender.com/tasks).
- Das Link der API-Dokumentation mit Swagger: [https://todolist-181m.onrender.com/api-docs](https://todolist-181m.onrender.com/api-docs).

GitHub Actions (Workflows) überprüft automatisch, ob es Probleme mit dem Back-End-Deployment gibt ([siehe Workflows](#Workflows)).

---

## Front-End

### Struktur
Die Applikation verwendet das Framework React mit TypeScript und die UI-Bibliothek Material UI.
Das Front-End liegt im Verzeichnis `./app/`:

- `./src/api.ts` holt alle Daten aus dem Back-End
- `./src/App.tsx` stellt die Web-Applikation dar
- `./src/components/taskList.tsx` zeigt die Liste der verschiedenen Aufgaben (Daten aus `./api/src/tasks.json`)
- `./src/components/taskForm.tsx` stellt das Formular zur Erstellung einer Aufgabe dar

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
Die Web-Applikation läuft auf `localhost:5173`.
> Ausnahme: Beim Render-Server gibt es einen eigenen Link ([siehe Front-End Deployment](#Front-End-Deployment)).

> ACHTUNG: Der Back-End Server muss auf `localhost:3000` starten. Andernfalls können keine Aufgaben geladen oder gespeichert werden. 

### Build
Um einen Build zu erstellen: 
```
cd app
npm run build
```

### Front-End-Deployment
Für das Deployment des Front-Ends verwende ich Vercel.

- Link zur Applikation: [https://to-do-list-rho-snowy-75.vercel.app/](https://to-do-list-rho-snowy-75.vercel.app/)

GitHub Actions (Workflows) überprüft automatisch, ob es Probleme mit dem Front-End-Deployment gibt ([siehe Workflows](#Workflows)).  

## Workflows

Die Workflows überprüfen automatisch, ob das Programm korrekt funktioniert.
Alle workflows befinden sich in `./.github/workflows/ci.yaml/`.

Es gibt 3 Workflows:
- Back-End Deployment Workflow 
- Front-End Deployment Workflow
- Vercel Workflow (über die Vercel-Webseite verwaltet)

Es gibt auch einen Workflow mit Render, aber GitHub zeigt ihn nicht an.