const { CommandContext, Command } = require("../../../../src");

module.exports = class ReloadCommand extends Command {
  constructor(client) {
    super(client);
    this.name = "reload";
    this.args = "<string name>";
    this.groups.push("utility");
    this.displayGroup = "Utility";
    this.aliases = ["r"];
    this.checks = ["dj.owner"];
  }
  /**
   *
   * @param {CommandContext} ctx
   */
  async execute(ctx, { name }) {
    if (name == this.name || this.aliases.includes(name))
      return ctx.msg.channel.send("You cannot reload this command!");
    let status = this.client.commands.reload(name);
    if (status === false)
      return ctx.msg.channel.send(
        "That command either does not exist or was not loaded from a file."
      );
    if (status === true)
      return ctx.msg.channel.send(`Command ${name} reloaded successfully!`);
    ctx.msg.channel.send(
      "An error occured while reloading:\n```js\n" + status.stack + "\n```"
    );
  }
};
