const express = require("express");

const router = express.Router();

const clients = require("../data/clients.json");

// GET /clients
router.get("/", (req, res) => {
    res.json(clients);
});

module.exports = router;