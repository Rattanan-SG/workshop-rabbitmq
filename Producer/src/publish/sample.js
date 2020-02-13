const { createChannel } = require("../config/rabbitmq");

module.exports = {
  sendMessageToQueue: async ({ queue, option, message }) => {
    const channel = await createChannel();
    channel.assertQueue(queue, { durable: false, ...option });
    return channel.sendToQueue(queue, Buffer.from(message));
  }
};
