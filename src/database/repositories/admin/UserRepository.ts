import { Client } from "@libsql/client/.";
import { tursoDB } from "../../connection";
import { User } from "../../models";
import { HttpResponse, UserPasswordUpdateDTO, UserResponseDTO, UserUpdateDTO } from "../../../models";
import { UserQueries } from "../../../queries";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE, HttpException } from "../../../error-handling";
import { validatePasswordHash } from "../../../helpers";

export class UserRepository {
    db: Client = tursoDB;

    createUser = async(user: User) : Promise<UserResponseDTO> => {
        const response = await this.db.execute({
            sql:  UserQueries.createUser,
            args: [user.userKey, user.firstName, user.lastName, user.email, user.passwordHash, user.salt, user.state, user.country, user.timezone, user.dateCreated]
        })

        if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        
        return new UserResponseDTO(user.firstName, user.lastName, user.email, user.timezone, user.state, user.country, user.dateCreated); 
    }

    getUserByUserKey = async (userKey: string): Promise<UserResponseDTO> => {
        const response = await this.db.execute({
            sql:  UserQueries.getUserByUserKey,
            args: [userKey]
        })

        if(response.rows.length === 0) { throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.userDoesntExist); }

        const data = response.toJSON()[0];

        return new UserResponseDTO(data["FirstName"], data["LastName"], data["Email"], data["Timezone"], data["State"], data["Country"], data["DateCreated"]);

    }

    validateUserCredentials = async (emailAddress: string, password: string): Promise<UserResponseDTO> => {
        const response = await this.db.execute({
            sql:  UserQueries.getUserByEmail,
            args: [emailAddress]
        })

        if(response.rows.length === 0) { throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.invalidEmail); }

        const data = response.toJSON()[0];

        const passwordCorrect = await validatePasswordHash(password, data["PasswordHash"]);
        if(!passwordCorrect) { throw new HttpException(HTTP_RESPONSE_CODE.UNAUTHORIZED, APP_ERROR_MESSAGE.invalidPassword); }


        return new UserResponseDTO(data["FirstName"], data["LastName"], data["Email"], data["Timezone"], data["State"], data["Country"], data["DateCreated"]);
    }

    updateUser = async (userKey: string, user: UserUpdateDTO): Promise<void> => {
        if(user.firstName !== undefined) {
            const response = await this.db.execute({
                sql: UserQueries.updateUserFirstName,
                args: [user.firstName]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(user.lastName !== undefined) {
            const response = await this.db.execute({
                sql: UserQueries.updateUserFirstName,
                args: [user.lastName]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(user.email !== undefined) {
            const response = await this.db.execute({
                sql: UserQueries.updateUserEmail,
                args: [user.email]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(user.country !== undefined) {
            const response = await this.db.execute({
                sql: UserQueries.updateUserCountry,
                args: [user.country]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(user.state !== undefined) {
            const response = await this.db.execute({
                sql: UserQueries.updateUserState,
                args: [user.state]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(user.timezone !== undefined) {
            const response = await this.db.execute({
                sql: UserQueries.updateUserTimezone,
                args: [user.timezone]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }
    }

    deleteUser = async (userKey: string): Promise<void> => {
        const response = await this.db.execute({
            sql:  UserQueries.deleteUser,
            args: [userKey]
        })

        if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
    }

    updateUserPassword = async(userKey: string, passwordData: UserPasswordUpdateDTO): Promise<void> => {
        const newHashedData = await passwordData.hashNewPassword();
        const response = await this.db.execute({
            sql: UserQueries.updateUserPasswordHashWithSalt,
            args: [newHashedData.passwordHash, newHashedData.salt, userKey]
        })

        if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
    }
}