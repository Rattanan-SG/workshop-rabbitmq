const { getChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

let channel;
const queue = "direct";
const option = { durable: false };

const startSubscribe = () => {
  try {
    channel = getChannel();
    channel.assertQueue(queue, option);
    channel.consume(
      queue,
      msg => {
        const content = JSON.parse(msg.content.toString());
        logInfo("Consumer received message", { content, msg });
      },
      { noAck: true }
    );
    logInfo(`[AMQP] Start subscribe to ${queue} queue`);
  } catch (error) {
    logError("[AMQP] Cannot start subscribe. Try again", error.message);
    return setTimeout(startSubscribe, 5000);
  }
  return channel;
};

module.exports = startSubscribe;
