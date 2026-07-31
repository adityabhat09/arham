require("dotenv").config();

const express = require("express");
const cors    = require("cors");

const { refreshDashboardCache } = require("./services/dashboardService");

const incentivesRoute  = require("./routes/incentives");
const myClientsRoute   = require("./routes/myClients");
const clientsRoute     = require("./routes/clients");
const employeesRoute   = require("./routes/employees");
const dashboardRoute   = require("./routes/dashboard");
const tradesRoute      = require("./routes/trades");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/incentives",  incentivesRoute);
app.use("/my-clients",  myClientsRoute);
app.use("/dashboard",   dashboardRoute);
app.use("/employees",   employeesRoute);
app.use("/clients",     clientsRoute);
app.use("/trades",      tradesRoute);

app.get("/", (req, res) => {
    res.send("Main App Running!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Main App running on http://localhost:${PORT}`);

    // Trigger an initial cache warm-up on startup so the first user
    // request is never met with empty data.
    console.log("🔄 Warming up cache on startup...");
    refreshDashboardCache().catch(err =>
        console.error("❌ Startup cache warm-up failed:", err.message)
    );
});