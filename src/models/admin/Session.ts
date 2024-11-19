import { randomUUID } from "crypto";
import { Session } from "../../database";
import { convertDateToGMTTimezoneFromIP } from "../../helpers";

export class SessionDTO {
  userKey: string;
  token: string;
  dateExpiration: Date;
  ipAddress: string;

  constructor(userKey: string, ipAddress: string) {
    this.userKey = userKey;
    this.token = randomUUID();
    this.dateExpiration = new Date();
    this.dateExpiration.setHours(this.dateExpiration.getHours() + 12)
    this.ipAddress = ipAddress;
  }

  toSession = async (): Promise<Session> => {
    const gmtDateExpiration = await this.convertSessionExpirationDateToGMT();
    return new Session(this.userKey, this.token, gmtDateExpiration.toISOString());
  };

  convertSessionExpirationDateToGMT = async (): Promise<Date> => {
    await convertDateToGMTTimezoneFromIP(this.dateExpiration, this.ipAddress);
    return this.dateExpiration;
  };
}
