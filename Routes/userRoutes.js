const express = require("express");
const createUser = require("../controllers/User/createUser");
const verifyUser = require("../controllers/User/verifyUser");
const getUser = require("../controllers/User/getUser");
const isAuth = require("../Middleware/isAuth");

const router = express.Router();

router.post("/login", createUser);
router.post("/verify", verifyUser);
router.get("/get", isAuth, getUser);

module.exports = router;