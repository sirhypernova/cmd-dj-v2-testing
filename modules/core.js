const { Module } = require("../../src");

module.exports = class CoreModule extends Module {
  constructor(client) {
    super(client);
    this.name = "core";
  }
  onLoad() {
    this.client.addMiddleware("command", (cmd, error, ctx, args) => {
      if (ctx.msg.guild.id != "606994805209169930") return false;
    });

    const timeMultipliers = {
      m: 1000 * 60,
      h: 1000 * 60 * 60,
      d: 1000 * 60 * 60 * 24,
    };

    const timeFull = {
      m: "minute(s)",
      h: "hour(s)",
      d: "day(s)",
    };

    const timeRegex = /^([0-9]{1,2})([mhd])*$/;

    this.client.arguments.addParser("time", (ctx, pos) => {
      if (!ctx.rawArgs[pos]) return { valid: false };
      if (!timeRegex.test(ctx.rawArgs[pos]))
        return { valid: false, value: "BAD_ARGUMENT" };
      const parsed = timeRegex.exec(ctx.rawArgs[pos]);

      let unit = parsed[2] == undefined ? "h" : parsed[2];
      const num = parseInt(parsed[1]);

      const length = timeMultipliers[unit] * num;
      return {
        valid: true,
        value: { time: length, unit, unitName: timeFull[unit], num },
      };
    });

    this.scanCommands("modules/core/commands");

    console.log("[%s] Loaded.", this.name);
  }
};
