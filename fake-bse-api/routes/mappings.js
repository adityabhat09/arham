const express = require("express");
const router = express.Router();
const Mapping = require("../models/Mapping");

// GET /mappings
router.get("/", async (req, res) => {
    try {
        const mappings = await Mapping.find({}, { _id: 0, __v: 0 });
        res.json(mappings);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch mappings" });
    }
});

module.exports = router;