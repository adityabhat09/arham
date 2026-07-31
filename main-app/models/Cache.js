const mongoose = require("mongoose");

const cacheSchema = new mongoose.Schema({
    // We only ever need one document in this collection
    key: { type: String, default: "singleton", unique: true },
    clients: { type: Array, default: [] },
    trades: { type: Array, default: [] },
    employees: { type: Array, default: [] },
    mappings: { type: Array, default: [] },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cache", cacheSchema);
