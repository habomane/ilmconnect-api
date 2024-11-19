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
exports.UserRepository = void 0;
const connection_1 = require("../../connection");
const models_1 = require("../../../models");
const queries_1 = require("../../../queries");
const error_handling_1 = require("../../../error-handling");
const helpers_1 = require("../../../helpers");
class UserRepository {
    constructor() {
        this.db = connection_1.tursoDB;
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const emailResponse = yield this.db.execute({
                sql: queries_1.UserQueries.getUserByEmail,
                args: [user.email]
            });
            if (emailResponse.rows.length !== 0) {
                throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.CONFLICT, error_handling_1.APP_ERROR_MESSAGE.emailNotAvailable);
            }
            const response = yield this.db.execute({
                sql: queries_1.UserQueries.createUser,
                args: [user.userKey, user.firstName, user.lastName, user.email, user.passwordHash, user.salt, user.state, user.country, user.timezone, user.dateCreated]
            });
            if (response.toJSON()["status"] === "error") {
                throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
            }
            return new models_1.UserResponseDTO(user.userKey, user.firstName, user.lastName, user.email, user.timezone, user.state, user.country, user.dateCreated);
        });
        this.getUserByUserKey = (userKey) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.db.execute({
                sql: queries_1.UserQueries.getUserByUserKey,
                args: [userKey]
            });
            if (response.rows.length === 0) {
                throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.NOT_FOUND, error_handling_1.APP_ERROR_MESSAGE.userDoesntExist);
            }
            const data = JSON.parse(JSON.stringify(response.rows[0]));
            return new models_1.UserResponseDTO(data["UserKey"], data["FirstName"], data["LastName"], data["Email"], data["Timezone"], data["State"], data["Country"], data["DateCreated"]);
        });
        this.validateUserCredentials = (emailAddress, password) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.db.execute({
                sql: queries_1.UserQueries.getUserByEmail,
                args: [emailAddress]
            });
            if (response.rows.length === 0) {
                throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.NOT_FOUND, error_handling_1.APP_ERROR_MESSAGE.invalidEmail);
            }
            const data = JSON.parse(JSON.stringify(response.rows[0]));
            const passwordCorrect = yield (0, helpers_1.validatePasswordHash)(password, data["PasswordHash"], data["Salt"]);
            if (!passwordCorrect) {
                throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.UNAUTHORIZED, error_handling_1.APP_ERROR_MESSAGE.invalidPassword);
            }
            return new models_1.UserResponseDTO(data["UserKey"], data["FirstName"], data["LastName"], data["Email"], data["Timezone"], data["State"], data["Country"], data["DateCreated"]);
        });
        this.updateUser = (userKey, user) => __awaiter(this, void 0, void 0, function* () {
            if (user.firstName !== undefined) {
                const response = yield this.db.execute({
                    sql: queries_1.UserQueries.updateUserFirstName,
                    args: [user.firstName, userKey]
                });
                if (response.toJSON()["status"] === "error") {
                    throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
                }
            }
            if (user.lastName !== undefined) {
                const response = yield this.db.execute({
                    sql: queries_1.UserQueries.updateUserLastName,
                    args: [user.lastName, userKey]
                });
                if (response.toJSON()["status"] === "error") {
                    throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
                }
            }
            if (user.email !== undefined) {
                const response = yield this.db.execute({
                    sql: queries_1.UserQueries.updateUserEmail,
                    args: [user.email, userKey]
                });
                if (response.toJSON()["status"] === "error") {
                    throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
                }
            }
            if (user.country !== undefined) {
                const response = yield this.db.execute({
                    sql: queries_1.UserQueries.updateUserCountry,
                    args: [user.country, userKey]
                });
                if (response.toJSON()["status"] === "error") {
                    throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
                }
            }
            if (user.state !== undefined) {
                const response = yield this.db.execute({
                    sql: queries_1.UserQueries.updateUserState,
                    args: [user.state, userKey]
                });
                if (response.toJSON()["status"] === "error") {
                    throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
                }
            }
            if (user.timezone !== undefined) {
                const response = yield this.db.execute({
                    sql: queries_1.UserQueries.updateUserTimezone,
                    args: [user.timezone, userKey]
                });
                if (response.toJSON()["status"] === "error") {
                    throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
                }
            }
        });
        this.deleteUser = (userKey) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.db.execute({
                sql: queries_1.UserQueries.deleteUser,
                args: [userKey]
            });
            if (response.toJSON()["status"] === "error") {
                throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
            }
        });
        this.updateUserPassword = (userKey, passwordData) => __awaiter(this, void 0, void 0, function* () {
            const newHashedData = yield passwordData.hashNewPassword();
            const response = yield this.db.execute({
                sql: queries_1.UserQueries.updateUserSalt,
                args: [newHashedData.salt, userKey]
            });
            const secondResponse = yield this.db.execute({
                sql: queries_1.UserQueries.updateUserPasswordHash,
                args: [newHashedData.passwordHash, userKey]
            });
            if (response.toJSON()["status"] === "error" || secondResponse.toJSON()["status"] === "error") {
                throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
            }
        });
    }
}
exports.UserRepository = UserRepository;
