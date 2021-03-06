const { getChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

const exchange = "logs.topic";
const type = "topic";
const routingKey = ["#", "sys.*", "*.info"];
const exchangeOption = { durable: false };
const queueOption = { exclusive: true };

const startSubscribe = async () => {
  let channel;
  try {
    channel = getChannel();
    channel.assertExchange(exchange, type, exchangeOption);
    routingKey.forEach(async key => {
      const { queue } = await channel.assertQueue("", queueOption);
      channel.bindQueue(queue, exchange, key);
      channel.prefetch(2);
      channel.consume(
        queue,
        msg => {
          const content = JSON.parse(msg.content.toString());
          setTimeout(() => {
            console.log(`[${content}] Topic ${key} Done`);
          }, 5000);
        },
        { noAck: true }
      );
      logInfo(`[AMQP] Start subscribe to ${queue} queue`);
    });
  } catch (error) {
    logError("[AMQP] Cannot start subscribe. Try again", {
      message: error.message
    });
    return setTimeout(startSubscribe, 5000);
  }
  return channel;
};

module.exports = startSubscribe;
