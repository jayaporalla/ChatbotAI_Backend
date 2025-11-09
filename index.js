const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const connectDb = require('./Database/database');
const userRoutes = require('./Routes/userRoutes');
const chatRoutes = require('./Routes/chatRoutes');

const app = express();

//env config
dotenv.config();

//middlware
app.use(express.json());

//cors
app.use(cors());

//routing
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
    connectDb();
});