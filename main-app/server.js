require("dotenv").config();

const express = require("express");

const myClientsRoute = require("./routes/myClients");
const clientsRoute = require("./routes/clients");
const employeesRoute = require("./routes/employees");
const dashboardRoute = require("./routes/dashboard");
const tradesRoute = require("./routes/trades");

const app = express();

app.use(express.json());

app.use("/dashboard", dashboardRoute);
app.use("/employees", employeesRoute);
app.use("/clients", clientsRoute);
app.use("/trades", tradesRoute);

app.get("/", (req, res) => {
    res.send("Main App Running!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Main App running on http://localhost:${PORT}`);
});