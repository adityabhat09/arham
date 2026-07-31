const express = require("express");
const router  = express.Router();
const { addClient } = require("../services/sseService");

/**
 * GET /events
 * Long-lived SSE connection. The browser keeps this open and receives
 * push notifications (e.g. "cache-updated") without polling.
 */
router.get("/", (req, res) => {
    // Required SSE headers
    res.setHeader("Content-Type",  "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection",    "keep-alive");
    res.flushHeaders();

    // Register this client for broadcasts
    addClient(res);

    // Confirm connection to the browser immediately
    res.write("event: connected\ndata: {}\n\n");

    // Heartbeat every 30s — prevents proxies (Render, nginx) from
    // closing idle SSE connections.
    const heartbeat = setInterval(() => {
        try {
            res.write(": heartbeat\n\n");
        } catch {
            clearInterval(heartbeat);
        }
    }, 30000);

    req.on("close", () => clearInterval(heartbeat));
});

module.exports = router;
