require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    rabbitmq_url: env.RABBITMQ_URL || "amqp://rabbitmq?heartbeat=60"
  },
  testing: {
    config_id: "testing",
    rabbitmq_url: env.RABBITMQ_URL || "amqp://rabbitmq?heartbeat=60"
  },
  staging: {
    config_id: "staging",
    rabbitmq_url: env.RABBITMQ_URL
  },
  production: {
    config_id: "production",
    rabbitmq_url: env.RABBITMQ_URL
  }
};

module.exports = config[state];
