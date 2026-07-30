const {
    refreshDashboardCache
} = require("../services/dashboardService");

const express = require("express");

const router = express.Router();

const {
    readCache
} = require("../services/cacheService");

router.get("/", async (req, res) => {

    const cache = await readCache();

    console.log(`📦 Returning ${cache.trades.length} trades from cache`);

    let trades = cache.trades;
    const { clientId, from, to } = req.query;

    if (clientId) {
        trades = trades.filter(trade => trade.clientId == clientId);
    }

    if (from) {
        trades = trades.filter(trade =>
            new Date(trade.date) >= new Date(from)
        );
    }

    if (to) {
        trades = trades.filter(trade =>
            new Date(trade.date) <= new Date(to)
        );
    }

    res.json(trades);
    refreshDashboardCache();

});

module.exports = router;