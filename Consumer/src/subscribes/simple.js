const { getChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

const queue = "simple";
const queueOption = { durable: false };

const startSubscribe = () => {
  let channel;
  try {
    channel = getChannel();
    channel.assertQueue(queue, queueOption);
    channel.consume(
      queue,
      msg => {
        const content = JSON.parse(msg.content.toString());
        console.log(content);
        // logInfo("Consumer received message", { content, msg });
      },
      { noAck: true }
    );
    logInfo(`[AMQP] Start subscribe to ${queue} queue`);
  } catch (error) {
    logError("[AMQP] Cannot start subscribe. Try again", {
      message: error.message
    });
    return setTimeout(startSubscribe, 5000);
  }
  return channel;
};

module.exports = startSubscribe;
