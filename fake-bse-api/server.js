require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connection");

const app = express();

const delay = require("./middleware/delay");
const clientsRoute = require("./routes/clients");
const tradesRoute = require("./routes/trades");
const employeesRoute = require("./routes/employees");
const mappingsRoute = require("./routes/mappings");

// Middleware
app.use(express.json());
app.use("/clients", delay, clientsRoute);
app.use("/trades", delay, tradesRoute);

app.use("/employees", employeesRoute);
app.use("/mappings", mappingsRoute);

// Home route
app.get("/", (req, res) => {
    res.send("Fake BSE API is running!");
});

const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas, then start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});