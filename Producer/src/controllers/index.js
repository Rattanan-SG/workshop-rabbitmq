const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");

module.exports = {
  sendMessageDirect: asyncWrapper(async (req, res) => {
    const result = await service.sendMessageDirect(req.body);
    res.send(result);
  }),
  sendMessageWorkQueue: asyncWrapper(async (req, res) => {
    const result = await service.sendMessageWorkQueue(req.body);
    res.send(result);
  })
};
