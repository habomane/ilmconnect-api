import { randomUUID } from "crypto";
import { convertDateToGMT, convertDateToUserTimezoneFromIP, HashedPassword, hashPassword } from "../../helpers";
import { User } from "../../database";

export class UserDTO {
    userKey: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    timezone: string;
    state: string;
    country: string;


    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        timezone: string,
        state: string,
        country: string
    ) {
        this.userKey = String(randomUUID());
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.timezone = timezone;
        this.state = state;
        this.country = country;
    }

    toUser = async (): Promise<User> => {
        const hashedData = await hashPassword(this.password);

        return new User(this.userKey, this.firstName, this.lastName,
            this.email, hashedData.passwordHash,hashedData.salt, this.timezone, this.state, this.country, new Date().toISOString()
        );
    }
}

export class UserUpdateDTO {
    firstName?: string;
    lastName?: string;
    email?: string;
    timezone?: string;
    state?: string;
    country?: string;

    constructor(
        firstName?: string,
        lastName?: string,
        email?: string,
        timezone?: string,
        state?: string,
        country?: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.timezone = timezone;
        this.state = state;
        this.country = country;
    }
}

export class UserPasswordUpdateDTO {
    newPassword: string;

    constructor(newPassword: string) { 
        this.newPassword = newPassword; 
    }

    hashNewPassword = async (): Promise<HashedPassword> => {
        return await hashPassword(this.newPassword);
    }

}


export class UserResponseDTO {
    firstName: string;
    lastName: string;
    email: string;
    timezone: string;
    state: string;
    country: string;
    dateJoined: Date;


    constructor(
        firstName: string,
        lastName: string,
        email: string,
        timezone: string,
        state: string,
        country: string,
        dateJoined: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.timezone = timezone;
        this.state = state;
        this.country = country;
        this.dateJoined = new Date(dateJoined);
    }

    setDateCreatedToUserTimezone = async (ipAddress: string): Promise<void> => {
        this.dateJoined = await convertDateToUserTimezoneFromIP(this.dateJoined, ipAddress);
      }
}