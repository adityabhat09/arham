const express = require("express");
const router = express.Router();
const Trade = require("../models/Trade");

// GET /trades
router.get("/", async (req, res) => {
    // Simulate BSE API pain: 5 second delay
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Simulate BSE API pain: 20% failure rate
    if (Math.random() < 0.2) {
        return res.status(500).json({ error: "BSE Connection Reset" });
    }

    try {
        const trades = await Trade.find({}, { _id: 0, __v: 0 });
        res.json(trades);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch trades" });
    }
});

module.exports = router;