const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
