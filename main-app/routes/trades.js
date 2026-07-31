const express = require("express");
const router  = express.Router();
const { readCache } = require("../services/cacheService");

// GET /trades?clientId=&from=&to=  — served instantly from cache
router.get("/", async (req, res) => {
    const cache = await readCache();
    console.log(`📦 Returning ${cache.trades.length} trades from cache`);

    let trades = cache.trades;
    const { clientId, from, to } = req.query;

    if (clientId) {
        trades = trades.filter(t => t.clientId == clientId);
    }
    if (from) {
        trades = trades.filter(t => new Date(t.date) >= new Date(from));
    }
    if (to) {
        trades = trades.filter(t => new Date(t.date) <= new Date(to));
    }

    res.json(trades);
});

module.exports = router;