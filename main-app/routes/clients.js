const express = require("express");
const router  = express.Router();
const { readCache } = require("../services/cacheService");

// GET /clients — served instantly from cache
router.get("/", async (req, res) => {
    console.log("📥 GET /clients");
    const cache = await readCache();
    console.log(`📦 Returning ${cache.clients.length} clients from cache`);
    res.json(cache.clients);
});

module.exports = router;