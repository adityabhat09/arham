const {
    refreshDashboardCache
} = require("../services/dashboardService");

const express = require("express");
const router = express.Router();

const { readCache } = require("../services/cacheService");

router.get("/:employeeId", async (req, res) => {

    const { employeeId } = req.params;

    const cache = await readCache();
    console.log(`📦 Returning incentive data from cache`);

    const { mappings, trades } = cache;

    const clientIds = mappings
        .filter(mapping => mapping.employeeId == employeeId)
        .map(mapping => mapping.clientId);

    const myTrades = trades.filter(trade =>
        clientIds.includes(trade.clientId)
    );

    const totalQuantity = myTrades.reduce(
        (sum, trade) => sum + trade.quantity,
        0
    );

    const incentive = totalQuantity * 10;

    res.json({
        employeeId,
        totalTrades: myTrades.length,
        totalQuantity,
        incentive
    });
    refreshDashboardCache();

});

module.exports = router;