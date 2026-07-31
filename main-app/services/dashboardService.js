const { readCache, writeCache } = require("./cacheService");
const { getClients, getTrades, getEmployees, getMappings } = require("./bseService");
const retry = require("../utils/retry");
const { broadcast } = require("./sseService");

// ─── Refresh lock & time-gate ───────────────────────────────────────────────
let isRefreshing  = false;
let lastRefreshedAt = 0;
// Configurable via env — set REFRESH_COOLDOWN_MS=60000 on Render for demo
const REFRESH_COOLDOWN_MS = Number(process.env.REFRESH_COOLDOWN_MS) || 5 * 60 * 1000;


async function refreshDashboardCache() {

    // Time-gate: skip if cache was refreshed recently
    if (Date.now() - lastRefreshedAt < REFRESH_COOLDOWN_MS) {
        console.log("⏱️  Cache is fresh, skipping refresh");
        return;
    }

    // Lock: skip if a refresh is already running
    if (isRefreshing) {
        console.log("🔒 Refresh already in progress, skipping");
        return;
    }

    isRefreshing = true;
    console.log("📡 Starting cache refresh...");

    try {
        // Read existing cache first — we fall back to it on partial failures
        const existing = await readCache();

        const results = await Promise.allSettled([
            retry(getClients,  "Clients"),
            retry(getTrades,   "Trades"),
            getEmployees(),
            getMappings(),
        ]);

        // Only replace each field if the fresh data is non-empty.
        // This preserves stale-but-valid data when BSE is down.
        const clients = (results[0].status === "fulfilled" && results[0].value.length > 0)
            ? results[0].value
            : existing.clients;

        const trades = (results[1].status === "fulfilled" && results[1].value.length > 0)
            ? results[1].value
            : existing.trades;

        const employees = (results[2].status === "fulfilled" && results[2].value.length > 0)
            ? results[2].value
            : existing.employees;

        const mappings = (results[3].status === "fulfilled" && results[3].value.length > 0)
            ? results[3].value
            : existing.mappings;

        await writeCache({ clients, trades, employees, mappings });

        lastRefreshedAt = Date.now();
        console.log(`✅ Cache refreshed — clients:${clients.length} trades:${trades.length} employees:${employees.length} mappings:${mappings.length}`);

        // Push instant notification to all connected browser tabs
        broadcast("cache-updated", { timestamp: lastRefreshedAt });

    } catch (err) {
        console.error("❌ Cache refresh error:", err.message);
    } finally {
        isRefreshing = false;
    }
}

module.exports = { refreshDashboardCache };