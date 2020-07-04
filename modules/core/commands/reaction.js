const { CommandContext, Command } = require("../../../../src");
const { MessageEmbed } = require("discord.js");

module.exports = class ReloadCommand extends Command {
  constructor(client) {
    super(client);
    this.name = "reaction";
    this.groups.push("test");
    this.displayGroup = "Test";
    this.checks = ["dj.owner"];
  }
  /**
   *
   * @param {CommandContext} ctx
   */
  async execute(ctx) {
    let page = 1;
    const maxPages = 5;
    const embed = new MessageEmbed()
      .setTitle("Menu")
      .setDescription("Some Menu")
      .setFooter(`Page ${page}/${maxPages}`);
    const msg = await ctx.msg.channel.send(embed);
    const menu = ctx.createReactionMenu(msg);
    await menu
      .clearOnFinish()
      .addButton("⬅️", () => {
        if (page == 1) return;
        page--;
        embed.setFooter(`Page ${page}/${maxPages}`);
        msg.edit(embed);
      })
      .addButton("⏹️", () => {
        menu.close();
      })
      .addButton("➡️", () => {
        if (page == maxPages) return;
        page++;
        embed.setFooter(`Page ${page}/${maxPages}`);
        msg.edit(embed);
      })
      .run(30000);
  }
};
