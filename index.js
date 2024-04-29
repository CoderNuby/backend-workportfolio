const mongoose = require("mongoose");
const app = require("./app");


connect();



async function connect(){
    await mongoose.connect('mongodb://x/workPortfolio').then(() => {
        console.log("\x1b[33m", "connection to the database successed", "\x1b[0m");
        app.listen(5000, () => {
            console.log("\x1b[33m", "connection to the server successed", "\x1b[0m");
        });
    });
}
