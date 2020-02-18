const { getChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

let channel;
const exchange = "logs.direct";
const type = "direct";
const routingKey = ["red", "green", "blue"];
const exchangeOption = { durable: false };
const queueOption = { exclusive: true };

const startSubscribe = async () => {
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
            console.log(`[${content}] Routing ${key} Done`);
          }, 5000);
        },
        { noAck: true }
      );
      logInfo(`[AMQP] Start subscribe to ${queue} queue`);
    });
  } catch (error) {
    logError("[AMQP] Cannot start subscribe. Try again", error.message);
    return setTimeout(startSubscribe, 5000);
  }
  return channel;
};

module.exports = startSubscribe;
