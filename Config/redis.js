const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
  console.log(error);
});
client.connect();
module.exports = client;