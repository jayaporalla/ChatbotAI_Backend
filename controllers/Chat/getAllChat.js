const Chat = require("../../Models/Chat");

const getAllChat = [
    async (req, res) => {
        try {
            const chat = await Chat.find({ user: req.user._id }).sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                message: "chat details fetched successfully",
                data: chat,
            });
        } catch (error) {
            console.error("Error fetching details:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
]

module.exports = getAllChat;