const express = require("express");

const router = express.Router();

const { getClients } = require("../services/bseService");

router.get("/", async (req, res) => {

    try {

        const clients = await getClients();

        res.json(clients);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;