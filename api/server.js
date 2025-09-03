const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

//Using a security with CORS, to allow only front-end to the port 5173
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());


//Data file, where the tasks are stocked
const DATA_FILE = "./tasks.json";
const readingWritingDatabase = require('./src/readingWritingDatabase');
const rwDB = new readingWritingDatabase(DATA_FILE);

//Test, if the server runs without problems
app.get('/', (req, res) => {
    res.send('Hello World!\n ' + rwDB.readTasks())
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})