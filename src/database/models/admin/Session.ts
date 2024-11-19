import { convertDateToUserTimezoneFromIP } from "../../../helpers";

export class Session {
  userKey: string;
  dateExpiration: string;
  token: string;

  constructor(userKey: string, token: string, dateExpiration: string) {
    this.userKey = userKey;
    this.dateExpiration = dateExpiration;
    this.token = token;
  }

  getDateUserTimezone = async (ipAddress: string) : Promise<Date> => {
    const date = new Date(this.dateExpiration);
    await convertDateToUserTimezoneFromIP(date, ipAddress);
    return date;
  }

  getDateExpiration = () : Date => {
    return new Date(this.dateExpiration);
  }
}
