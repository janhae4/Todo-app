const { default: mongoose } = require("mongoose");

const Task = mongoose.model("Task", new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    categories: { type: [String], required: true },
    process: { type: String, required: true },
    userID: { type: String, required: true }
}, { timestamps: true }))

module.exports = Task