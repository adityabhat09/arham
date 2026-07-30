const {
    readCache,
    writeCache
} = require("../services/cacheService");

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

    const cachedData = await readCache();

    res.json(cachedData);

    (async () => {

        try {

            const results = await Promise.allSettled([
                retry(getClients),
                retry(getTrades),
                getEmployees(),
                getMappings()
            ]);

            const clients =
                results[0].status === "fulfilled" ? results[0].value : [];

            const trades =
                results[1].status === "fulfilled" ? results[1].value : [];

            const employees =
                results[2].status === "fulfilled" ? results[2].value : [];

            const mappings =
                results[3].status === "fulfilled" ? results[3].value : [];

            const dashboardData = {
                clients,
                trades,
                employees,
                mappings
            };

            await writeCache(dashboardData);

        } catch (error) {

            console.error("Background refresh failed:", error);

        }

    })();

});

module.exports = router;