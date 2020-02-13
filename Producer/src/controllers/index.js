const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");

module.exports = {
  hello: asyncWrapper(async (req, res) => {
    const result = await service.hello();
    res.send(result);
  })
};
