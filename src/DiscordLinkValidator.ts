import { Client, Guild } from "discord.js";
import { channelIds } from "./constants";
import { validate } from "validate.js";

export class DiscordLinkValidator {
  private client: Client = new Client();

  public start(token: string): void {
    this.client.on("ready", () => {
      console.log("ready");
    });

    this.client.on("message", message => {
      const channelId: any = message.channel.id;
      // check if this is a channel we want to filter
      if (channelIds.indexOf(channelId) > -1) {
        // check if there's no attachment
        const attachments: any = message.attachments;
        if (attachments.size < 1) {
          const content: string[] = message.content.split(/\s+/);
          let index: number = 0
          let invalid: boolean = true;
          for ( ; index < content.length; index++) {
            if (validate({website: content[index]}, {website: {url: true}}) == undefined) {
              invalid = false;
              break;
            }
          }
          if (invalid) {
            message.delete();
          }
        }
      } 
    });

    this.client.login(token).catch(err => {
      console.log(err);
    });
  }
}
