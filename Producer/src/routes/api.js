const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.post("/sendMessageDirect", controller.sendMessageDirect);

module.exports = router;
