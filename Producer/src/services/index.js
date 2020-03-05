const {
  simple,
  workQueue,
  fanout,
  routing,
  topic,
  rcpClient,
  deadLetter
} = require("../publishes");

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
  },
  sendMessageTopic: async ({ exchange, routingKey, message }) => {
    const result = await topic.sendMessageToTopicExchange({
      exchange,
      routingKey,
      message
    });
    return { exchange, routingKey, message, result };
  },
  sendMessageToRCPServer: async ({ queue, message }) => {
    const result = await rcpClient.sendMessageToRCPServer({
      queue,
      message
    });
    return { queue, message, result };
  },
  sendMessageToDeadLetter: async ({ exchange, routingKey, message }) => {
    const result = await deadLetter.sendMessageToDirectExchange({
      exchange,
      routingKey,
      message
    });
    return { exchange, routingKey, message, result };
  }
};
