const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./Database/database');
const router = require('./Routes/userRoutes');

const app = express();

//env config
dotenv.config();

//middlware
app.use(express.json());

//routing
app.use("/api/user", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
    connectDb();
});