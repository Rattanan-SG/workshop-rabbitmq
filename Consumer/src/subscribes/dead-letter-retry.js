const { getChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

const exchange = "retry.exchange";
const type = "direct";
const routingKey = "work.queue";
const exchangeOption = { durable: true };
const queueName = "retry.queue";
const queueOption = {
  durable: true,
  deadLetterExchange: "work.exchange",
  deadLetterRoutingKey: routingKey,
  messageTtl: 1000 * 5
};

const startSubscribe = async () => {
  let channel;
  try {
    channel = getChannel();
    channel.assertExchange(exchange, type, exchangeOption);
    const { queue } = await channel.assertQueue(queueName, queueOption);
    channel.bindQueue(queue, exchange, routingKey);
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
