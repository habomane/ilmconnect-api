import { convertDateToUserTimezoneFromIP } from "../../../helpers";

export class User {
  userKey: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  salt: string;
  timezone: string;
  state: string;
  country: string;
  dateCreated: string;

  constructor(
    userKey: string,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    salt: string,
    timezone: string,
    state: string,
    country: string,
    dateCreated: string
  ) {
    this.userKey = userKey;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.passwordHash = passwordHash;
    this.salt = salt;
    this.timezone = timezone;
    this.state = state;
    this.country = country;
    this.dateCreated = dateCreated;
  }

}


