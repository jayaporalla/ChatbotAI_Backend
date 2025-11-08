const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const verifyUser = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { otp, verifyToken } = req.body;

            if (!otp || !verifyToken) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    message: "OTP and verifyToken are required"
                });
            }

            const verify = jwt.verify(verifyToken, process.env.JSON_TOKEN);

            if(!verify){
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    message: "OTP Expired"
                });
            }

            if(Number(verify.otp) !== Number(otp)){
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    message: "Wrong OTP"
                });
            }

            const token = jwt.sign({ _id: verify.user._id }, process.env.JWT_SECRET, {
                expiresIn: "5d"
            });

            await session.commitTransaction();
            session.endSession();

            return res.status(201).json({
                success: true,
                message: "LoggedIn Successfully",
                user: verify.user,
                token
            });

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error verifying user", error);
            res.status(500).json({ success: false, message: error.message });
            console.error("Error details:", error.message, error.stack);
        }
    }
]

module.exports = verifyUser;