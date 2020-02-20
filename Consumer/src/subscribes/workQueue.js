const { getChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

const queue = "WorkQueue";
const queueOption = { durable: true };

const startSubscribe = () => {
  let channel;
  try {
    channel = getChannel();
    channel.assertQueue(queue, queueOption);
    channel.prefetch(2);
    channel.consume(
      queue,
      msg => {
        const content = JSON.parse(msg.content.toString());
        setTimeout(() => {
          console.log(`[${content}] WorkQueue Done`);
          channel.ack(msg);
        }, 5000);
      },
      { noAck: false }
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
