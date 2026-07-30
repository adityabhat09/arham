const express = require("express");
const router = express.Router();

const { readCache } = require("../services/cacheService");

router.get("/:employeeId", async (req, res) => {

    const { employeeId } = req.params;

    const cache = await readCache();

    const mappings = cache.mappings;
    const clients = cache.clients;

    const clientIds = mappings
        .filter(mapping => mapping.employeeId == employeeId)
        .map(mapping => mapping.clientId);

    const myClients = clients.filter(client =>
        clientIds.includes(client.clientId)
    );

    res.json(myClients);

});

module.exports = router;