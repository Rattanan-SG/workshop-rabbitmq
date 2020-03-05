const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.post("/sendMessageSimple", controller.sendMessageSimple);
router.post("/sendMessageWorkQueue", controller.sendMessageWorkQueue);
router.post("/sendMessageFanout", controller.sendMessageFanout);
router.post("/sendMessageRouting", controller.sendMessageRouting);
router.post("/sendMessageTopic", controller.sendMessageTopic);
router.post("/sendMessageToRCPServer", controller.sendMessageToRCPServer);
router.post("/sendMessageToDeadLetter", controller.sendMessageToDeadLetter);

module.exports = router;
