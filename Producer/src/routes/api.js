const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.post("/sendMessageDirect", controller.sendMessageDirect);
router.post("/sendMessageWorkQueue", controller.sendMessageWorkQueue);

module.exports = router;
