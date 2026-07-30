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
    console.log(`📦 Returning ${cache.employees.length} employees from cache`);

    res.json(cache.employees);
    refreshDashboardCache();

});

module.exports = router;