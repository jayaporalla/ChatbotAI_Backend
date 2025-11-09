const mongoose = require("mongoose");
const Conversation = require("../../Models/Conversation");
const Chat = require("../../Models/Chat");

const addConversation = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {

            let { question, answer } = req.body;

            const errors = [];

            if(!question || typeof question !== "string" || question.trim() === "") {
                errors.push("A valid question required");
            }

            if(!answer || typeof answer !== "string" || answer.trim() === "") {
                errors.push("A valid answer required");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const chat = await Chat.findById(req.params.id);

            if(!chat){
                await session.abortTransaction();
                session.endSession();
                res.status(404).json({
                    hasError: true,
                    message: "No chat id found"
                })
            }

            const conversation = await Conversation.create({
                chat: chat._id,
                question,
                answer
            })

            const updatedChat = await Chat.findByIdAndUpdate(
                req.params.id,
                { latestMessage: question },
                { new: true }
            )

            updatedChat.$session(session);
            await updatedChat.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Conversation added successfully",
                data: {
                    conversation,
                    updatedChat
                }
            })
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error adding conversation", error);
            res.status(500).json({ success: false, message: error.message })
            console.error("Error details:", error.message, error.stack );
        }
    }
]

module.exports = addConversation;