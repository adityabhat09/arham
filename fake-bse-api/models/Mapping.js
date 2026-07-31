const mongoose = require("mongoose");

const mappingSchema = new mongoose.Schema({
    clientId: { type: Number, required: true },
    employeeId: { type: Number, required: true },
});

module.exports = mongoose.model("Mapping", mappingSchema);
