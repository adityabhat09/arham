const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// GET /clients
router.get("/", async (req, res) => {
    // Configurable simulated pain
    const delayMs     = Number(process.env.BSE_DELAY_MS) || 5000;
    const failureRate = Number(process.env.BSE_FAILURE_RATE) || 0.2;

    await new Promise(resolve => setTimeout(resolve, delayMs));
    
    if (Math.random() < failureRate) {
        return res.status(500).json({ error: "BSE Connection Reset" });
    }

    try {
        const clients = await Client.find({}, { _id: 0, __v: 0 });
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch clients" });
    }
});

module.exports = router;