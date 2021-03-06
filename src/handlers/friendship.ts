import { logger } from "../logger";
import { Handler, WechatyFriendship, WechatyContact } from "./handler";

export class Friendship extends Handler {
  public async listener(friendship: WechatyFriendship) {
    try {
      const friendshipContact: WechatyContact = friendship.contact();
      const friendshipHelloStatement: string = friendship.hello();
      switch (friendship.type()) {
        // 1. New Friend Request
        case WechatyFriendship.Type.Receive: {
          logger.info(
            `received friendship event from ${friendshipContact} with ${friendshipHelloStatement}`
          );

          let sleepTime = this.getRandomIntInclusive(10000, 30000);
          await this.sleep(sleepTime);
          await friendship.accept();
          break;
        }
        // 2. Friend Ship Confirmed
        case WechatyFriendship.Type.Confirm: {
          logger.info(
            `friendship confirmed with ${friendshipContact}(${friendshipContact.id})`
          );
          let sayDelayTime = this.getRandomIntInclusive(10000, 30000);
          await this.sleep(sayDelayTime);
          await friendshipContact.say(`Welcome to talk to Bot`);

          let updateContactDelayTime = 10000; //ms = 10 s
          await this.sleep(updateContactDelayTime);
          await friendshipContact.sync();
          break;
        }
      }
    } catch (e) {
      logger.error("Bot", "friendship event exception: %s", e.stack);
    }
  }
}
