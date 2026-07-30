const express = require("express");

const router = express.Router();

const mappings = require("../data/mappings.json");

router.get("/", (req, res) => {
    res.json(mappings);
});

module.exports = router;