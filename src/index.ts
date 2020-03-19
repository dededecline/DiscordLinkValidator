import { DiscordLinkValidator } from "./DiscordLinkValidator";
const { token }: { token: string } = require("../auth.json");

const bot: DiscordLinkValidator = new DiscordLinkValidator();
bot.start(token);
