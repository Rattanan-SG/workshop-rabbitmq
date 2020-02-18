const { getChannel } = require("../config/rabbitmq");

module.exports = {
  sendMessageToQueue: ({ queue, option, message }) => {
    const channel = getChannel();
    channel.assertQueue(queue, { durable: false, ...option });
    return channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }
};
