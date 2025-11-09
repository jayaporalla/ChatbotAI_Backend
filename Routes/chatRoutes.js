const express = require("express");
const createChat = require("../controllers/Chat/createChat");
const getAllChat = require("../controllers/Chat/getAllChat");
const addConversation = require("../controllers/Chat/addConversation");
const getConversation = require("../controllers/Chat/getConversation");
const isAuth = require("../Middleware/isAuth");
const deleteChat = require("../controllers/Chat/deleteChat");

const router = express.Router();

router.post("/create", isAuth, createChat);
router.get("/get", isAuth, getAllChat);
router.post("/:id", isAuth, addConversation);
router.get("/:id", isAuth, getConversation);
router.delete("/:id", isAuth, deleteChat);

module.exports = router;