const express = require("express");

const router = express.Router();

const trades = require("../data/trades.json");

router.get("/", (req, res) => {
    res.json(trades);
});

module.exports = router;