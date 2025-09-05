const request = require("supertest");
const app = require("../src/server");

//Data file, where the tasks are stocked
const DATA_FILE = "./tasks.test.json";
const readingWritingDatabase = require('../src/readingWritingDatabase');
const test = require("node:test");
const rwDB = new readingWritingDatabase(DATA_FILE);

//Reset the file JSON before the tests
rwDB.reset();

test("GET with a void DATA_FILE", async () => {
    const res = await request(app).get("/tasks.server");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
})