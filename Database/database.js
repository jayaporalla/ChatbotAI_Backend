const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "ChatbotAIDB"
        })
        console.log("MongoDB Connected");
    } catch(error){
        console.log(error);
    }
}

module.exports = connectDb;