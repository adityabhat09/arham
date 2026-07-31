const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// GET /clients
router.get("/", async (req, res) => {
    try {
        const clients = await Client.find({}, { _id: 0, __v: 0 });
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch clients" });
    }
});

module.exports = router;