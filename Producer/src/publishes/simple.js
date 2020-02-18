const { getChannel } = require("../config/rabbitmq");

module.exports = {
  sendMessageToQueue: ({ queue, queueOption, message, sendOption }) => {
    const channel = getChannel();
    channel.assertQueue(queue, { durable: false, ...queueOption });
    return channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message), sendOption)
    );
  }
};
