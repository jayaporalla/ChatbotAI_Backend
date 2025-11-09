const mongoose = require("mongoose");
const Chat = require("../../Models/Chat");

const createChat = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const userId = req.user._id;

            const chat = await Chat.create({
                user: userId
            });

            chat.$session(session);
            await chat.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: "Chat created successfully",
                data: chat
            })
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating chat", error);
            res.status(500).json({ success: false, message: error.message });
            console.error("Error details:", error.message, error.stack);
        }
    }
]

module.exports = createChat;