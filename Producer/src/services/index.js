const { directExchange, workQueue } = require("../publishes");

module.exports = {
  sendMessageDirect: async ({ queue, message }) => {
    const result = await directExchange.sendMessageToQueue({ queue, message });
    return { queue, message, result };
  },
  sendMessageWorkQueue: async ({ queue, message }) => {
    const result = await workQueue.sendMessageToQueue({ queue, message });
    return { queue, message, result };
  }
};
