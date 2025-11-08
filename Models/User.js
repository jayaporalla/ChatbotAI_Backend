const mongoose = require("mongoose");

const user = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

const User = mongoose.model("User", user);
module.exports = User;