const { getChannel } = require("../config/rabbitmq");
const { logInfo, logError } = require("../utils/logger");

const queue = "rpc_queue";
const queueOption = { durable: false };

const fibonacci = number => {
  if (number == 0 || number == 1) return number;
  else return fibonacci(number - 1) + fibonacci(number - 2);
};

const startSubscribe = async () => {
  let channel;
  try {
    channel = getChannel();
    channel.assertQueue(queue, queueOption);
    channel.prefetch(2);
    channel.consume(
      queue,
      msg => {
        const {
          content,
          properties: { replyTo, correlationId }
        } = msg;
        const number = parseInt(content.toString());
        console.log(
          `Receive ${number} from client ${correlationId}. Start Processing`
        );
        const payload = fibonacci(number);
        channel.sendToQueue(replyTo, Buffer.from(payload.toString()), {
          correlationId: correlationId
        });
        console.log(`[${number} -> ${payload}] rcp-server Done`);
        channel.ack(msg);
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
