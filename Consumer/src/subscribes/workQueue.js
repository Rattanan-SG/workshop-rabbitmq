const { getChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

let channel;
const queue = "WorkQueue";
const option = { durable: true };

const startSubscribe = () => {
  try {
    channel = getChannel();
    channel.assertQueue(queue, option);
    channel.prefetch(2);
    channel.consume(
      queue,
      msg => {
        const content = JSON.parse(msg.content.toString());
        setTimeout(() => {
          console.log(`[${content}] Done `);
          channel.ackAll(msg);
        }, 5000);
      },
      { noAck: false }
    );
    logInfo(`[AMQP] Start subscribe to ${queue} queue`);
  } catch (error) {
    logError("[AMQP] Cannot start subscribe. Try again", error.message);
    return setTimeout(startSubscribe, 5000);
  }
  return channel;
};

module.exports = startSubscribe;
