const { Client, CommandContext, Command } = require("../src");
const client = new Client();
client.setConfig({
  token: "BOT_TOKEN",
  owners: ["USER_ID"],
  prefix: "!",
});

client.modules.scan("modules");

client.enableInlineCommands();

client
  .run()
  .then(() => {
    console.log(`Logged in as ${client.user.tag}`);
  })
  .catch((err) => {
    console.log("Error", err);
  });
