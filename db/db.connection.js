const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoDbUrl = process.env.mongoDbUrl;

// async function initializeDatabase() {
//     await mongoose.connect(mongoDbUrl)
//         .then(() => { console.log("Connected to database") })
//         .catch((err) => { console.log("Error connecting", err) });
// }

async function initializeDatabase() {
    try {
        await mongoose.connect(mongoDbUrl);
        console.log("Connected to database");
    } catch (err) {
        console.error("Error connecting database:", err);
        throw err;
    }
}


module.exports = { initializeDatabase };