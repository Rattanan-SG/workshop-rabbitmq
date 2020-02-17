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
      msg => {
        const content = JSON.parse(msg.content.toString());
        logInfo("Consumer received message", { content, msg });
      },
      { noAck: true }
    );
    logInfo("[AMQP] Start subscribe to queue" + queue, { queue });
  } catch (error) {
    logError("[AMQP] Cannot start subscribe. Try again", error.message);
    return setTimeout(startSubscribe, 5000);
  }
  return channel;
};
