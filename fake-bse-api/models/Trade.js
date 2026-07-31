const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
    tradeId: { type: Number, required: true, unique: true },
    clientId: { type: Number, required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: String, required: true },
});

module.exports = mongoose.model("Trade", tradeSchema);
