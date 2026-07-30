require("dotenv").config();

const express = require("express");

const dashboardRoute = require("./routes/dashboard");

const app = express();

app.use(express.json());

app.use("/dashboard", dashboardRoute);

app.get("/", (req, res) => {
    res.send("Main App Running!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Main App running on http://localhost:${PORT}`);
});