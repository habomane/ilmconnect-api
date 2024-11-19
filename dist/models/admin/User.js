"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDTO = exports.UserPasswordUpdateDTO = exports.UserUpdateDTO = exports.UserDTO = void 0;
const crypto_1 = require("crypto");
const helpers_1 = require("../../helpers");
const database_1 = require("../../database");
class UserDTO {
    constructor(firstName, lastName, email, password, timezone, state, country) {
        this.toUser = () => __awaiter(this, void 0, void 0, function* () {
            const hashedData = yield (0, helpers_1.hashPassword)(this.password);
            return new database_1.User(this.userKey, this.firstName, this.lastName, this.email, hashedData.passwordHash, hashedData.salt, this.timezone, this.state, this.country, new Date().toISOString());
        });
        this.userKey = String((0, crypto_1.randomUUID)());
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.timezone = timezone;
        this.state = state;
        this.country = country;
    }
}
exports.UserDTO = UserDTO;
class UserUpdateDTO {
    constructor(firstName, lastName, email, timezone, state, country) {
        this.firstName = firstName === "" ? undefined : firstName;
        this.lastName = lastName === "" ? undefined : lastName;
        this.email = email === "" ? undefined : email;
        this.timezone = timezone === "" ? undefined : timezone;
        this.state = state === "" ? undefined : state;
        this.country = country === "" ? undefined : country;
    }
}
exports.UserUpdateDTO = UserUpdateDTO;
class UserPasswordUpdateDTO {
    constructor(newPassword) {
        this.hashNewPassword = () => __awaiter(this, void 0, void 0, function* () {
            return yield (0, helpers_1.hashPassword)(this.newPassword);
        });
        this.newPassword = newPassword;
    }
}
exports.UserPasswordUpdateDTO = UserPasswordUpdateDTO;
class UserResponseDTO {
    constructor(userKey, firstName, lastName, email, timezone, state, country, dateJoined) {
        this.setDateCreatedToUserTimezone = (ipAddress) => __awaiter(this, void 0, void 0, function* () {
            yield (0, helpers_1.convertDateToUserTimezoneFromIP)(this.dateJoined, ipAddress);
        });
        this.userKey = userKey;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.timezone = timezone;
        this.state = state;
        this.country = country;
        this.dateJoined = new Date(dateJoined);
    }
}
exports.UserResponseDTO = UserResponseDTO;
