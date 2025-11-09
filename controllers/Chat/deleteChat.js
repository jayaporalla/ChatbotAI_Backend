const mongoose = require("mongoose");
const Chat = require("../../Models/Chat");

const deleteChat = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params;

            const errors = [];

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid chat ID is required.");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                hasError: true,
                message: errors.join(" "),
                });
            }

            const chat = await Chat.findById(id);

            if (!chat) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                hasError: true,
                message: "chat ID not found",
                });
            }

            if(chat.user.toString() !== req.user._id.toString()){
                await session.abortTransaction();
                session.endSession();
                return res.status(403).json({
                hasError: true,
                message: "Unauthorized",
                });
            }

            await Chat.deleteOne();

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "chat deleted successfully"
            })
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error deleting chat", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
]

module.exports = deleteChat;