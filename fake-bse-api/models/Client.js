const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    pan: { type: String, required: true },
});

module.exports = mongoose.model("Client", clientSchema);
