const { getChannel } = require("../config/rabbitmq");

module.exports = {
  sendMessageToDirectExchange: ({
    exchange,
    routingKey,
    exchangeOption,
    message,
    sendOption
  }) => {
    const channel = getChannel();
    channel.assertExchange(exchange, "direct", {
      durable: false,
      ...exchangeOption
    });
    return channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message), sendOption)
    );
  }
};
