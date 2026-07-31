const express = require("express");
const router  = express.Router();
const { readCache } = require("../services/cacheService");

// GET /my-clients/:employeeId — returns only clients mapped to this employee
router.get("/:employeeId", async (req, res) => {
    const { employeeId } = req.params;
    const cache = await readCache();

    const clientIds = cache.mappings
        .filter(m => m.employeeId == employeeId)
        .map(m => m.clientId);

    const myClients = cache.clients.filter(c => clientIds.includes(c.id));
    console.log(`📦 Returning ${myClients.length} assigned clients for employee ${employeeId}`);

    res.json(myClients);
});

module.exports = router;