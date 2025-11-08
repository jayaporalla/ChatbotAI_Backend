const mongoose = require("mongoose");
const User = require("../../Models/User");
const jwt = require("jsonwebtoken");
const sendOTP = require("../../Middleware/sendOTP");

const createUser = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const {
                email
            } = req.body

            const errors = [];

            if(!email || typeof email !== "string" || email.trim() === "") {
                errors.push("Valid email required");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            let user = await User.findOne({ email });

            if(!user) {
                user = await User.create({
                    email
                })
            }

            const otp = Math.floor(Math.random() * 1000000);

            const verifyToken = jwt.sign({ user, otp }, process.env.JSON_TOKEN, 
                {
                    expiresIn: "5m"
            })

            await sendOTP(email, "Chatbot", otp);

            user.$session(session);
            await user.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: "OTP Sent Successfully",
                verifyToken
            })
        } catch(error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating email", error);
            res.status(500).json({ success: false, message: error.message });
            console.error("Error details:", error.message, error.stack);
        }
    }
]

module.exports = createUser;