const { createChannel } = require("../config/rabbitmq");

const queue = "test1";
const option = { durable: false };

const start = async () => {
  const channel = await createChannel();
  channel.assertQueue(queue, option);
  channel.consume(
    queue,
    message => {
      console.log("Consumer Received %s", message.content.toString());
    },
    { noAck: true }
  );
};

module.exports = start();
