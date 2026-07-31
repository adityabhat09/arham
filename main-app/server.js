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
const eventsRoute      = require("./routes/events");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/incentives",  incentivesRoute);
app.use("/my-clients",  myClientsRoute);
app.use("/dashboard",   dashboardRoute);
app.use("/events",      eventsRoute);
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

    // Background job: Periodically fetch from BSE to keep the cache fresh.
    // If new data is found and the cache is updated, the SSE service will 
    // automatically push it to the frontend.
    setInterval(() => {
        refreshDashboardCache().catch(err => 
            console.error("❌ Background cache refresh failed:", err.message)
        );
    }, 60 * 1000); // Check every 60 seconds (adjust as needed)
});