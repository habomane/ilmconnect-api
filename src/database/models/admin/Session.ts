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
    return await convertDateToUserTimezoneFromIP(new Date(this.dateExpiration), ipAddress);
  }

  getDateExpiration = () : Date => {
    return new Date(this.dateExpiration);
  }
}
