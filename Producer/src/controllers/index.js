const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");

module.exports = {
  sendMessageSimple: asyncWrapper(async (req, res) => {
    const result = await service.sendMessageSimple(req.body);
    res.send(result);
  }),
  sendMessageWorkQueue: asyncWrapper(async (req, res) => {
    const result = await service.sendMessageWorkQueue(req.body);
    res.send(result);
  }),
  sendMessageFanout: asyncWrapper(async (req, res) => {
    const result = await service.sendMessageFanout(req.body);
    res.send(result);
  }),
  sendMessageRouting: asyncWrapper(async (req, res) => {
    const result = await service.sendMessageRouting(req.body);
    res.send(result);
  }),
  sendMessageTopic: asyncWrapper(async (req, res) => {
    const result = await service.sendMessageTopic(req.body);
    res.send(result);
  }),
  sendMessageToRCPServer: asyncWrapper(async (req, res) => {
    const result = await service.sendMessageToRCPServer(req.body);
    res.send(result);
  }),
  sendMessageToDeadLetter: asyncWrapper(async (req, res) => {
    const result = await service.sendMessageToDeadLetter(req.body);
    res.send(result);
  })
};
