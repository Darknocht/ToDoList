const fs = require("fs");

class readingWritingDatabase {

    //Private element
    #DATA_FILE;
    constructor(DATA_FILE) {
        this.DATA_FILE = DATA_FILE;
    }

    readTasks() {
        if (!fs.existsSync(this.DATA_FILE)) return [];
        return JSON.parse(fs.readFileSync(this.DATA_FILE));
    }

    writeTasks(tasks) {
        fs.writeFileSync(this.DATA_FILE, JSON.stringify(tasks, null, 2));
    }
}

module.exports = readingWritingDatabase;