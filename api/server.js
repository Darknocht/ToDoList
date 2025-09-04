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

//Different commands for a task

//GET /tasks
app.get('/tasks', (req, res) => {
    res.json(rwDB.readTasks())
})

//POST /tasks
app.post('/tasks', (req, res) => {
    const {title, description="", status = "todo" } = req.body;

    //Checking arguments
    //title must not empty and max 100 characters
    if(title.length <= 0 || title.length > 100){
        return res.status(400).json({ error: "Invalid title" });
    }
    //description must max 500 characters and not contain <script>
    if(description.length > 500 || /script/i.test(description)){
        //<script> can be <SCRIPT>, <ScRiPt>, etc.
        return res.status(400).json({ error: "Invalid description" });
    }
    //status must contain todo, in-progress or done
    if(!["todo","in-progress","done"].includes(status)){
        //We can use includes because we have only 3 values
        return res.status(400).json({ error: "Invalid status" });
    }

    //After Checking, the task will be added
    const tasks = rwDB.readTasks();
    const newTask = { id: Date.now(), title, description, status };
    tasks.push(newTask);
    rwDB.writeTasks(tasks);

    //Code 201 = new created task without problem
    res.status(201).json(newTask);
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})