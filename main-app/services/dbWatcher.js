const mongoose = require("mongoose");
const { refreshDashboardCache } = require("./dashboardService");

/**
 * Connects to MongoDB and sets up Change Streams to listen for any
 * insert, update, or delete across the 4 main collections.
 * 
 * When a change is detected, we force an immediate cache refresh.
 * This provides 100% real-time data flow with zero polling.
 */
function startWatcher() {
    if (!process.env.MONGODB_URI) {
        console.warn("⚠️  MONGODB_URI not set. Change Streams disabled.");
        return;
    }

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("✅ Main App connected to MongoDB for Change Streams");
            
            const db = mongoose.connection;
            const collections = ["clients", "trades", "employees", "mappings"];

            collections.forEach(collName => {
                const stream = db.collection(collName).watch();
                
                stream.on("change", (change) => {
                    console.log(`🔔 Database change detected in '${collName}' (${change.operationType}). Forcing cache refresh...`);
                    // Bypass the 5-minute cooldown and refresh immediately
                    refreshDashboardCache(true).catch(err => {
                        console.error("❌ Forced cache refresh failed:", err.message);
                    });
                });

                stream.on("error", (err) => {
                    console.error(`❌ Change Stream error on '${collName}':`, err.message);
                });
            });
        })
        .catch(err => {
            console.error("❌ Main App MongoDB connection failed:", err.message);
        });
}

module.exports = { startWatcher };
