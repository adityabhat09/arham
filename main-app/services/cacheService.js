const fs = require("fs").promises;
const path = require("path");

const CACHE_FILE = path.join(__dirname, "../cache/dashboard.json");

async function readCache() {

    const data = await fs.readFile(CACHE_FILE, "utf-8");

    return JSON.parse(data);

}

async function writeCache(data) {

    await fs.writeFile(
        CACHE_FILE,
        JSON.stringify(data, null, 2)
    );

}

module.exports = {
    readCache,
    writeCache
};