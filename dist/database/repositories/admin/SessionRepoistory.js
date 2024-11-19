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
exports.SessionRepository = void 0;
const connection_1 = require("../../connection");
const models_1 = require("../../models");
const admin_1 = require("../../../queries/admin");
const error_handling_1 = require("../../../error-handling");
class SessionRepository {
    constructor() {
        this.db = connection_1.tursoDB;
        this.putSession = (session) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.db.execute({
                sql: admin_1.SessionQueries.createSession,
                args: [session.userKey, session.token, session.dateExpiration]
            });
            if (response.toJSON()["status"] === "error") {
                throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
            }
            return session;
        });
        this.getSessionByUser = (userKey) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.db.execute({
                sql: admin_1.SessionQueries.getLatestSessionByUser,
                args: [userKey]
            });
            if (response.rows.length === 0) {
                throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.NOT_FOUND, error_handling_1.APP_ERROR_MESSAGE.sessionByUserDoesntExist);
            }
            const returnedUserKey = String(response.rows[0]["UserKey"]);
            const returnedToken = String(response.rows[0]["Token"]);
            const returnedDateExpiration = String(response.rows[0]["DateExpiration"]);
            return new models_1.Session(returnedUserKey, returnedToken, returnedDateExpiration);
        });
        this.getSessionByToken = (token) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.db.execute({
                sql: admin_1.SessionQueries.getLatestSessionByToken,
                args: [token]
            });
            if (response.rows.length === 0) {
                throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.NOT_FOUND, error_handling_1.APP_ERROR_MESSAGE.sessionByTokenDoesntExist);
            }
            const returnedUserKey = String(response.rows[0]["UserKey"]);
            const returnedToken = String(response.rows[0]["Token"]);
            const returnedDateExpiration = String(response.rows[0]["DateExpiration"]);
            return new models_1.Session(returnedUserKey, returnedToken, returnedDateExpiration);
        });
    }
}
exports.SessionRepository = SessionRepository;
