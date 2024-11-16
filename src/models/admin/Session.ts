import { randomUUID } from "crypto";
import { Session } from "../../database";

export class SessionDTO {
  userKey: string;
  token: string;
  dateExpiration: Date;
  ipAddress: string;

  constructor(userKey: string, ipAddress: string) {
    this.userKey = userKey;
    this.token = randomUUID();
    this.dateExpiration = new Date();
    this.ipAddress = ipAddress;
  }

  toSession = (): Session => {
    return new Session(this.userKey, this.token, this.dateExpiration.toISOString());
  };

  convertDateTimeToGMT = (): string => {
    return "";
  };
}
