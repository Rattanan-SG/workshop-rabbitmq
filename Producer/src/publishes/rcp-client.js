const { getChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

const queueOption = { exclusive: true };

const generateUid = () => {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
};

const startSubscribe = async () => {
  let channel;
  let queueName;
  let correlationId = generateUid();
  try {
    channel = getChannel();
    const { queue } = await channel.assertQueue("", queueOption);
    queueName = queue;
    channel.prefetch(2);
    channel.consume(
      queue,
      msg => {
        const { content, properties } = msg;
        const payload = JSON.parse(content.toString());
        if (properties.correlationId === correlationId) {
          console.log(`[${correlationId}] rcp-client receive ${payload}`);
        }
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
  return { channel, queueName, correlationId };
};

module.exports = {
  sendMessageToRCPServer: async ({ queue, message, sendOption }) => {
    const {
      channel,
      queueName: replyTo,
      correlationId
    } = await startSubscribe();
    return channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      replyTo,
      correlationId,
      ...sendOption
    });
  }
};
