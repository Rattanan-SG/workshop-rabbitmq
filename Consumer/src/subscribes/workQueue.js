const { createChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

let channel = null;
const queue = "WorkQueue";
const option = { durable: true };

module.exports = startSubscribe = async () => {
  try {
    channel = await createChannel();
    channel.assertQueue(queue, option);
    channel.prefetch(1);
    channel.consume(
      queue,
      msg => {
        const content = JSON.parse(msg.content.toString());
        // logInfo("Consumer received message", { content, msg });
        setTimeout(() => {
          console.log(`[${content}] Done `);
          channel.ackAll(msg);
        }, 5000);
      },
      { noAck: false }
    );
    logInfo("[AMQP] Start subscribe to queue", queue);
  } catch (error) {
    logError("[AMQP] Cannot start subscribe. Try again", error.message);
    return setTimeout(startSubscribe, 5000);
  }
  return channel;
};
