const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// GET /clients
router.get("/", async (req, res) => {
    // Simulate BSE API pain: 5 second delay
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Simulate BSE API pain: 20% failure rate
    if (Math.random() < 0.2) {
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