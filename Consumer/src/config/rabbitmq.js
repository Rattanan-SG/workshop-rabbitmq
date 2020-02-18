const amqplib = require("amqplib");
const CustomError = require("../utils/custom-error");
const { logInfo, logError } = require("../utils/logger");

let connection;
let channel;

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
    await createChannel();
  } catch (error) {
    logError(
      "[AMQP] Cannot create connection. Try reconnecting",
      error.message
    );
    return setTimeout(connect, 5000);
  }
};

const createChannel = async () => {
  if (typeof channel === "undefined") {
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
      logError("[AMQP] Cannot create channel", error.message);
      return setTimeout(createChannel, 5000);
    }
  }
};

const getConnection = () => {
  if (typeof channel === "undefined") {
    throw new CustomError("AMQP_CONNECTION_NOT_READY", 500, `Try again later.`);
  }
  return channel;
};
const getChannel = () => {
  if (typeof channel === "undefined") {
    throw new CustomError("AMQP_CHANNEL_NOT_READY", 500, `Try again later.`);
  }
  return channel;
};

connect();
process.on("SIGINT", async () => {
  await connection.close();
  process.exit();
});

module.exports = {
  getConnection,
  getChannel
};
