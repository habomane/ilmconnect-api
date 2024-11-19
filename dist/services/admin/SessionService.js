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
exports.SessionService = void 0;
const database_1 = require("../../database");
class SessionService {
    constructor() {
        this.createSession = (session) => __awaiter(this, void 0, void 0, function* () {
            const sessionRequest = yield session.toSession();
            return this.sessionRepoistory.putSession(sessionRequest);
        });
        this.getSessionByUserKey = (userKey) => __awaiter(this, void 0, void 0, function* () {
            return this.sessionRepoistory.getSessionByUser(userKey);
        });
        this.getSessionByToken = (token) => __awaiter(this, void 0, void 0, function* () {
            return this.sessionRepoistory.getSessionByToken(token);
        });
        this.sessionRepoistory = new database_1.SessionRepository();
    }
}
exports.SessionService = SessionService;
