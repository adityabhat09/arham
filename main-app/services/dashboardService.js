const { writeCache } = require("./cacheService");

const {
    getClients,
    getTrades,
    getEmployees,
    getMappings
} = require("./bseService");

const retry = require("../utils/retry");

async function refreshDashboardCache() {


    const results = await Promise.allSettled([
        retry(getClients, "Clients"),
        retry(getTrades, "Trades"),
        getEmployees(),
        getMappings()
    ]);

    const clients =
        results[0].status === "fulfilled" ? results[0].value : [];

    const trades =
        results[1].status === "fulfilled" ? results[1].value : [];

    const employees =
        results[2].status === "fulfilled" ? results[2].value : [];

    const mappings =
        results[3].status === "fulfilled" ? results[3].value : [];

    const dashboardData = {
        clients,
        trades,
        employees,
        mappings
    };

    await writeCache(dashboardData);
    console.log("✅ Cache refreshed successfully");
}
module.exports = {
    refreshDashboardCache
};