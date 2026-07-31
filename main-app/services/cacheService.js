const fs   = require("fs").promises;
const path = require("path");

const CACHE_FILE = path.join(__dirname, "../cache/dashboard.json");

const EMPTY_CACHE = { clients: [], trades: [], employees: [], mappings: [] };

async function readCache() {
    try {
        const data = await fs.readFile(CACHE_FILE, "utf-8");
        const parsed = JSON.parse(data);
        // Ensure all expected keys exist even if file is partially written
        return {
            clients:   parsed.clients   || [],
            trades:    parsed.trades    || [],
            employees: parsed.employees || [],
            mappings:  parsed.mappings  || [],
        };
    } catch (err) {
        // File missing, empty, or corrupted — return safe defaults
        console.warn("⚠️  Cache read failed, using empty defaults:", err.message);
        return { ...EMPTY_CACHE };
    }
}

async function writeCache(data) {
    await fs.writeFile(CACHE_FILE, JSON.stringify(data, null, 2));
}

module.exports = { readCache, writeCache };