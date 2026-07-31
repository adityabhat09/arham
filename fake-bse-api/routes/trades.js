const express = require("express");
const router = express.Router();
const Trade = require("../models/Trade");

// GET /trades
router.get("/", async (req, res) => {
    try {
        const trades = await Trade.find({}, { _id: 0, __v: 0 });
        res.json(trades);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch trades" });
    }
});

module.exports = router;