"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userKey, firstName, lastName, email, passwordHash, salt, timezone, state, country, dateCreated) {
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
exports.User = User;
