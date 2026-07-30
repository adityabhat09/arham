const {
    readCache,
    writeCache
} = require("../services/cacheService");
const {
    refreshDashboardCache
} = require("../services/dashboardService");

const express = require("express");

const router = express.Router();

const {
    getClients,
    getTrades,
    getEmployees,
    getMappings
} = require("../services/bseService");

const retry = require("../utils/retry");

router.get("/", async (req, res) => {

    console.log("\n==============================");
    console.log("📥 Dashboard request received");

    const cachedData = await readCache();

    console.log("⚡ Serving cached dashboard data to client");

    res.json(cachedData);

    (async () => {

    try {

        console.log("📡 Refreshing dashboard cache...");

        await refreshDashboardCache();

        console.log("✅ Cache refreshed successfully");

    } catch (error) {

        console.error("❌ Background refresh failed:", error.message);

    }

})();

});

module.exports = router;