const express = require("express");

const router = express.Router();

const {
    readCache
} = require("../services/cacheService");

router.get("/", async (req, res) => {

    const cache = await readCache();

    res.json(cache.clients);

});

module.exports = router;