const amqplib = require("amqplib");
const { logInfo, logError } = require("../utils/logger");

let connection = null;
let channel = null;

const connect = async () => {
  try {
    connection = await amqplib.connect(global.gConfig.rabbitmq_url);
    connection.on("error", error => {
      if (error.message !== "Connection closing") {
        logError("[AMQP] Connection error", error.message);
      }
    });
    connection.on("close", () => {
      logError("[AMQP] Connection close. Try reconnecting");
      return setTimeout(connect, 5000);
    });
    logInfo("[AMQP] Connected");
  } catch (error) {
    logError(
      "[AMQP] Cannot create connection. Try reconnecting",
      error.message
    );
    return setTimeout(connect, 5000);
  }
};

const createChannel = async () => {
  if (!connection) {
    await connect();
  }
  if (!channel) {
    try {
      channel = await connection.createChannel();
      channel.on("error", error => {
        logError("[AMQP] Channel error", error.message);
      });
      channel.on("close", () => {
        logInfo("[AMQP] Channel closed");
      });
      logInfo("[AMQP] Create channel success");
    } catch (error) {
      logError("[AMQP] Cannot create channel. Try again", error.message);
    }
  }
  return channel;
};

connect();

module.exports = {
  createChannel
};
