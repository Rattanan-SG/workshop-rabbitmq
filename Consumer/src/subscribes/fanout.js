const { getChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

const exchange = "logs.fanout";
const type = "fanout";
const exchangeOption = { durable: false };
const queueOption = { exclusive: true };

const startSubscribe = async () => {
  let channel;
  try {
    channel = getChannel();
    const { queue } = await channel.assertQueue("", queueOption);
    channel.assertExchange(exchange, type, exchangeOption);
    channel.bindQueue(queue, exchange, "");
    channel.prefetch(2);
    channel.consume(
      queue,
      msg => {
        const content = JSON.parse(msg.content.toString());
        setTimeout(() => {
          console.log(`[${content}] Fanout Done`);
        }, 5000);
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
