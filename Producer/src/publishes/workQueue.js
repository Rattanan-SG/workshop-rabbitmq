const { getChannel } = require("../config/rabbitmq");

module.exports = {
  sendMessageToQueue: ({ queue, queueOption, message, sendOption }) => {
    const channel = getChannel();
    channel.assertQueue(queue, { durable: true, ...queueOption });
    return channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
      ...sendOption
    });
  }
};
