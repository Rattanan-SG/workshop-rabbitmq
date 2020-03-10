const { getChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

const exchange = "work.exchange";
const type = "direct";
const routingKey = "work.queue";
const exchangeOption = { durable: true };
const queueName = "work.queue";
const queueOption = {
  durable: true,
  deadLetterExchange: "retry.exchange",
  deadLetterRoutingKey: routingKey
};

const startSubscribe = async () => {
  let channel;
  try {
    channel = getChannel();
    channel.assertExchange(exchange, type, exchangeOption);
    const { queue } = await channel.assertQueue(queueName, queueOption);
    channel.bindQueue(queue, exchange, routingKey);
    channel.prefetch(2);
    channel.consume(
      queue,
      msg => {
        const content = JSON.parse(msg.content.toString());
        const countReject =
          (msg.properties.headers["x-death"] &&
            msg.properties.headers["x-death"][0].count) ||
          0;
        const time = new Date().toLocaleTimeString("en-US");
        setTimeout(() => {
          // console.log(`[${content}] work queue Done : count ${countReject} : ${time}`);
          // channel.ack(msg);
          console.log(
            `[${content}] work queue reject : count ${countReject} : ${time}`
          );
          channel.nack(msg, false, false);
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
