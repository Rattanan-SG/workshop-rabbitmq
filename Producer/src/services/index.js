const { sendMessageToQueue } = require("../publish/directExchange");

module.exports = {
  hello: async () => {
    const queue = "test1";
    const message = "Hello World";
    await sendMessageToQueue({ queue, message });
    return `Send Hello to rabbitMQ`;
  }
};
