const { getChannel } = require("../config/rabbitmq");

module.exports = {
  sendMessageToDirectExchange: ({
    exchange,
    routingKey,
    message,
    sendOption
  }) => {
    const channel = getChannel();
    channel.assertExchange(exchange, "direct", {
      durable: true
    });
    return channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message), { deliveryMode: true })
    );
  }
};
