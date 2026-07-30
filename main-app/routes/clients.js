const express = require("express");

const router = express.Router();

const {
    readCache
} = require("../services/cacheService");

const {
    refreshDashboardCache
} = require("../services/dashboardService");

router.get("/", async (req, res) => {

    console.log("📥 GET /clients");

    const cache = await readCache();

    console.log(`📦 Returning ${cache.clients.length} clients from cache`);


    res.json(cache.clients);
    refreshDashboardCache();

});

module.exports = router;