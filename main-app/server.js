require("dotenv").config();

const express = require("express");
const cors    = require("cors");
const mongoose = require("mongoose");

const { refreshDashboardCache } = require("./services/dashboardService");
const { startWatcher } = require("./services/dbWatcher");

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

app.listen(PORT, async () => {
    console.log(`Main App running on http://localhost:${PORT}`);

    // Connect to MongoDB to store our persistent cache
    if (process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("✅ Main App connected to MongoDB Cache");
        } catch (err) {
            console.error("❌ Failed to connect to MongoDB Cache:", err.message);
        }
    } else {
        console.warn("⚠️ MONGODB_URI not found. Persistent cache disabled.");
    }

    // Trigger an initial cache warm-up on startup so the first user
    // request is never met with empty data.
    console.log("🔄 Warming up cache on startup...");
    refreshDashboardCache().catch(err =>
        console.error("❌ Startup cache warm-up failed:", err.message)
    );

    // Start listening to MongoDB Change Streams for true real-time updates
    // Zero polling required.
    startWatcher();
});