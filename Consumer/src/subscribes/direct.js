const { createChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

let channel = null;
const queue = "direct";
const option = { durable: false };

module.exports = startSubscribe = async () => {
  try {
    channel = await createChannel();
    channel.assertQueue(queue, option);
    channel.consume(
      queue,
      message => {
        const content = JSON.parse(message.content.toString());
        logInfo("Consumer received message", { content, msg: message });
      },
      { noAck: true }
    );
    logInfo("[AMQP] Start subscribe to queue", queue);
  } catch (error) {
    logError("[AMQP] Cannot start subscribe. Try again", error.message);
    return setTimeout(startSubscribe, 5000);
  }
  return channel;
};
