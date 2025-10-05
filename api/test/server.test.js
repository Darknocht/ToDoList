const request = require("supertest");
const app = require("../src/server");

//Mocking dompurify
jest.mock("dompurify");

//Data file, where the tasks are stocked
const DATA_FILE = "test/tasks.test.json"; //   ./src/tasks.json
const readingWritingDatabase = require('../src/readingWritingDatabase');
const test = require("node:test");
const rwDB = new readingWritingDatabase(DATA_FILE);

//Reset the file JSON before each tests
beforeEach(() => {
    rwDB.reset()
});

describe("CORS configuration", () => {
    it("CORS should allow requests from localhost:5173", async () => {
        const res = await request(app)
            .get("/tasks")
            .set("Origin", "http://localhost:5173");

        expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:5173");
        expect(res.statusCode).toBe(200);
    });

    it("CORS should allow requests from the Vercel link", async () => {
        const res = await request(app)
            .get("/tasks")
            .set("Origin", "https://to-do-list-rho-snowy-75.vercel.app");

        expect(res.headers["access-control-allow-origin"]).toBe("https://to-do-list-rho-snowy-75.vercel.app");
        expect(res.statusCode).toBe(200);
    });

    it("CORS should block requests from unauthorized origins", async () => {
        const res = await request(app)
            .get("/tasks")
            .set("Origin", "http://www.google.com"); //Google is an example but another link can work

        expect(res.headers["access-control-allow-origin"]).toBeUndefined();
        expect(res.statusCode).toBe(500);
        expect(res.text).toMatch(/Not allowed by CORS/);
    });
});

describe("Tasks API", () => {
    it("GET should return a void array", async () => {
        const res = await request(app).get("/tasks");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    it("GET should return an array with data", async () => {
        const task = await request(app)
            .post("/tasks")
            .send({ title: "Test" });
        const task2 = await request(app)
            .post("/tasks")
            .send({ title: "New task", description: "I love to make a task.", status: "todo" });
        const res = await request(app)
            .get(`/tasks/`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{id:res.body[0].id, title:"Test", description:"", status:"todo"},
            {id:res.body[1].id, title: "New task", description: "I love to make a task.", status: "todo" }]);
    });

    it("POST should create a task", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({ title: "New task", description: "I love to make a task.", status: "todo" });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("New task");
    });

    it("POST should throw a error with a too long title", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({ title: "", description: "I love to make a task.", status: "todo" });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/Invalid title/);
    });

    it("POST should throw a error with a no title", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({ title: "a".repeat(101) });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/Invalid title/);
    });

    it("POST should throw a error with a too long description", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({ title: "Test", description: "a".repeat(501), status: "todo" });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/Invalid description/);
    });

    it("POST should sanitize with script in description", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({ title: "Test", description: "test test <script> test test test", status: "todo" });
        expect(res.statusCode).toBe(201);
        expect(res.body.description).toBe("test test ");
    });

    it("POST should sanitize with SCRIPT in description", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({ title: "Test", description: "test test <SCRIPT> test test test", status: "todo" });
        expect(res.statusCode).toBe(201);
        expect(res.body.description).toBe("test test ");
    });

    it("POST should sanitize with ScRiPt in description", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({ title: "Test", description: "test test <ScRiPt> test test test", status: "todo" });
        expect(res.statusCode).toBe(201);
        expect(res.body.description).toBe("test test ");
    });

    it("POST should throw a error with unknown status", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({ title: "Test", description: "", status: "test" });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/Invalid status/);
    });

    it("POST should create a task with status in-progress", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({ title: "New task", description: "I love to make a task.", status: "in-progress" });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("New task");
    });

    it("POST should create a task with status done", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({ title: "New task", description: "I love to make a task.", status: "done" });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("New task");
    });

    it("PATCH should update the statut with done", async () => {
        const task = await request(app)
            .post("/tasks")
            .send({ title: "Test" });
        const res = await request(app)
            .patch(`/tasks/${task.body.id}`)
            .send({ status: "done" });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("done");
    });

    it("PATCH should update the statut with in-progress", async () => {
        const task = await request(app)
            .post("/tasks")
            .send({ title: "Test" });
        const res = await request(app)
            .patch(`/tasks/${task.body.id}`)
            .send({ status: "in-progress" });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("in-progress");
    });

    it("PATCH should update the statut with todo", async () => {
        const task = await request(app)
            .post("/tasks")
            .send({ title: "Test" });
        const res = await request(app)
            .patch(`/tasks/${task.body.id}`)
            .send({ status: "todo" });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("todo");
    });

    it("PATCH should throw a error with an unknown task", async () => {
        const res = await request(app)
            .patch(`/tasks/ab`)
            .send({ status: "done" });
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toMatch(/Task not found/);
    });

    it("PATCH should throw a error with an unknown status", async () => {
        const task = await request(app)
            .post("/tasks")
            .send({ title: "Test" });
        const res = await request(app)
            .patch(`/tasks/${task.body.id}`)
            .send({ status: "test" });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/Invalid status/);
    });

    it("DELETE should delete a task", async () => {
        const task = await request(app)
            .post("/tasks")
            .send({ title: "Test" });
        const res = await request(app).delete(`/tasks/${task.body.id}`);
        expect(res.statusCode).toBe(204);
    });

    it("DELETE should throw a error with an unknown task", async () => {
        const res = await request(app).delete(`/tasks/ab`);
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toMatch(/Task not found/);
    });
});