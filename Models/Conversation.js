const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true }
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;