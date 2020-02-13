const { createChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

let channel = null;
const queue = "test1";
const option = { durable: false };

module.exports = startSubscribe = async () => {
  try {
    channel = await createChannel();
    channel.assertQueue(queue, option);
    channel.consume(
      queue,
      message => {
        logInfo(`Consumer Received ${message.content.toString()}`, message);
      },
      { noAck: true }
    );
    logInfo("[AMQP] Start SampleSubscribe");
  } catch (error) {
    logError("[AMQP] Cannot start subscribe. Try again", error.message);
    return setTimeout(startSubscribe, 5000);
  }
  return channel;
};
