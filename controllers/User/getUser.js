const User = require("../../Models/User");

const getUser = [
    async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User.findById(req.user._id);

            res.status(200).json({
                success: true,
                message: "user details fetched successfully",
                data: user,
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

module.exports = getUser;