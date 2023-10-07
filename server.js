const mongoose = require("mongoose");
const next = require("next");
const dotenv = require("dotenv");

const dev = process.env.NODE_ENV != "production";
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connection successful!"));

const PORT = process.env.PORT;
let server;
nextServer.prepare().then(() => {
    app.get("*", (req, res) => {
        return handle(req, res);
    });

    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}...`);
    });
});
