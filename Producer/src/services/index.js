const { sendMessageToQueue } = require("../publish/directExchange");

module.exports = {
  sendMessageDirect: async ({ queue, message }) => {
    const result = await sendMessageToQueue({ queue, message });
    return { queue, message, result };
  }
};
