const { getChannel } = require("../config/rabbitmq");

module.exports = {
  sendMessageToTopicExchange: ({
    exchange,
    routingKey,
    exchangeOption,
    message,
    sendOption
  }) => {
    const channel = getChannel();
    channel.assertExchange(exchange, "topic", {
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
