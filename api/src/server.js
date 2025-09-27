const express = require("express");
const cors = require("cors");

const app = express();

//Using a security with CORS, to allow only front-end to the port 5173
const allowedOrigins = [
    "http://localhost:5173",
    "https://to-do-list-rho-snowy-75.vercel.app" //Vercel server (Front-End)
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
}));

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    next();
});

app.use(express.json());


//Data file, where the tasks are stocked
const readingWritingDatabase = require('./readingWritingDatabase');

const fs = require("fs");
const yaml = require("yaml");
const swaggerUi = require("swagger-ui-express");

const file = fs.readFileSync("./src/swagger.yaml", "utf8");
const swaggerDocument = yaml.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//We want just 2 files for our Programm, tasks.json for the App and tasks.test.json for tests
/* istanbul ignore next */
const rwDB = new readingWritingDatabase(
    process.env.NODE_ENV === "test" ? "test/tasks.test.json" : "src/tasks.json"
);

//Different commands for a task

//GET /tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(rwDB.readTasks()) //Code 200 (OK)
});

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
});

//PATCH /tasks:id
app.patch('/tasks/:id', (req, res) => {
    //Given task
    const {id} = req.params;
    const {status} = req.body;

    //All tasks stocks
    const allTasks = rwDB.readTasks();

    //Checking if we find the task in allTasks
    const task = allTasks.find(task => task.id === Number(id));
    if(!task){
        return res.status(404).json({ error: "Task not found" });
    }

    //Checking if the status is between the 3 values
    if(!["todo", "in-progress", "done"].includes(status)){
        return res.status(400).json({ error: "Invalid status" });
    }

    //Update status of task in DATA_FILE
    task.status = status;
    rwDB.writeTasks(allTasks);
    res.status(200).json(task); //Code 200 (OK)
});

app.delete('/tasks/:id', (req, res) => {
    //id for the deleted task
    const {id} = req.params;

    //All tasks stocks
    const allTasks = rwDB.readTasks();

    //We copy the all tasks in newTasks except the deleted task
    const newTasks = allTasks.filter(t => t.id !== Number(id));

    //If the length of both are equals, the task wasn't deleted
    if(allTasks.length === newTasks.length){
        return res.status(404).json({ error: "Task not found" });
    }

    //Update the tasks in DATA_FILE
    rwDB.writeTasks(newTasks);
    res.status(204).send(); //Code 204 (OK, but no additional content)
});

module.exports = app;