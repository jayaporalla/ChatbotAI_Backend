const express = require("express");
const createUser = require("../controllers/User/create");
const verifyUser = require("../controllers/User/verify");

const router = express.Router();

router.post("/login", createUser);
router.post("/verify", verifyUser);

module.exports = router;