const { getChannel } = require("../config/rabbitmq");

module.exports = {
  sendMessageToFanoutExchange: ({
    exchange,
    exchangeOption,
    message,
    sendOption
  }) => {
    const channel = getChannel();
    channel.assertExchange(exchange, "fanout", {
      durable: false,
      ...exchangeOption
    });
    return channel.publish(
      exchange,
      "",
      Buffer.from(JSON.stringify(message), sendOption)
    );
  }
};
