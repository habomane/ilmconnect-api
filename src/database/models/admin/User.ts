export class User {
  userKey: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  salt: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

  constructor(
    userKey: string,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    salt: string,
    streetAddress: string,
    city: string,
    state: string,
    postalCode: string,
    country: string
  ) {
    this.userKey = userKey;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.passwordHash = passwordHash;
    this.salt = salt;
    this.streetAddress = streetAddress;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
  }
}
