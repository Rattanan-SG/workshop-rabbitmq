const { simple, workQueue, fanout, routing } = require("../publishes");

module.exports = {
  sendMessageSimple: async ({ queue, message }) => {
    const result = await simple.sendMessageToQueue({ queue, message });
    return { queue, message, result };
  },
  sendMessageWorkQueue: async ({ queue, message }) => {
    const result = await workQueue.sendMessageToQueue({ queue, message });
    return { queue, message, result };
  },
  sendMessageFanout: async ({ exchange, message }) => {
    const result = await fanout.sendMessageToFanoutExchange({
      exchange,
      message
    });
    return { exchange, message, result };
  },
  sendMessageRouting: async ({ exchange, routingKey, message }) => {
    const result = await routing.sendMessageToDirectExchange({
      exchange,
      routingKey,
      message
    });
    return { exchange, routingKey, message, result };
  }
};
