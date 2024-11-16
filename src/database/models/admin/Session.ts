export class Session {
  userKey: string;
  dateExpiration: Date;
  token: string;

  constructor(userKey: string, token: string, dateExpiration: string) {
    this.userKey = userKey;
    this.dateExpiration = new Date(dateExpiration);
    this.token = token;
  }
}
