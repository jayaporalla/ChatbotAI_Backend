const mongoose = require("mongoose");
const Conversation = require("../../Models/Conversation");

const getConversation = [
    async (req, res) => {
        try {
            const conversation = await Conversation.find( req.params._id );

            if(!conversation){
                res.status(404).json({
                    message: "No conversation id found"
                })
            }

            res.status(200).json({
                success: true,
                message: "conversation details fetched successfully",
                data: conversation,
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

module.exports = getConversation;