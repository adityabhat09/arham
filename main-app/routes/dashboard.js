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

    try {
        const results = await Promise.allSettled([
            retry(getClients),
            retry(getTrades),
            getEmployees(),
            getMappings()
        ]);
        const clients = results[0];
        const trades = results[1];
        const employees = results[2];
        const mappings = results[3];
        const errors = {};

        res.json({

            clients:
                clients.status === "fulfilled"
                    ? clients.value
                    : (errors.clients = "BSE API unavailable", null),

            trades:
                trades.status === "fulfilled"
                    ? trades.value
                    : (errors.trades = "BSE API unavailable", null),

            employees:
                employees.status === "fulfilled"
                    ? employees.value
                    : null,

            mappings:
                mappings.status === "fulfilled"
                    ? mappings.value
                    : null,

            errors

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;