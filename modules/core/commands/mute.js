const { CommandContext, Command } = require("../../../../src");

module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client);
    this.name = "mute";
    this.args = "<member> <time> <long? reason>";
    this.groups.push("moderation");
    this.displayGroup = "Moderation";
  }
  /**
   *
   * @param {CommandContext} ctx
   */
  execute(ctx, { member, time, reason }) {
    if (member.user.id == ctx.msg.author.id)
      return ctx.msg.channel.send("You can't mute yourself!");
    ctx.msg.channel.send(
      `Muted \`${member.user.tag}\` with duration \`${time.num} ${
        time.unitName
      }\` for \`${reason ? reason : "None Provided"}\``
    );
  }
  /**
   *
   * @param {CommandContext} ctx
   */
  badArgs(ctx, { name, error }) {
    if (error === true) return this.usageMessage(ctx);
    switch (name) {
      case "member":
        switch (error) {
          case "BAD_ARGUMENT":
            ctx.msg.channel.send("Please enter a valid member.");
            break;
          case "NOT_IN_GUILD":
            ctx.msg.channel.send("That user is not in this guild.");
            break;
        }
        break;
      case "time":
        switch (error) {
          case "BAD_ARGUMENT":
            ctx.msg.channel.send("Please enter a valid time.");
            break;
        }
        break;
    }
  }
};
