const express = require("express");
const router = express.Router();
const Trade = require("../models/Trade");

// GET /trades
router.get("/", async (req, res) => {
    // Configurable simulated pain
    const delayMs     = Number(process.env.BSE_DELAY_MS) || 5000;
    const failureRate = Number(process.env.BSE_FAILURE_RATE) || 0.2;

    await new Promise(resolve => setTimeout(resolve, delayMs));
    
    if (Math.random() < failureRate) {
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