const simple = require("./simple");
const workQueue = require("./workQueue");
const fanout = require("./fanout");
const routing = require("./routing");
const topic = require("./topic");
const rcpClient = require("./rcp-client");
const deadLetter = require("./dead-letter");

module.exports = {
  simple,
  workQueue,
  fanout,
  routing,
  topic,
  rcpClient,
  deadLetter
};
