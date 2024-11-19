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
exports.SessionDTO = void 0;
const crypto_1 = require("crypto");
const database_1 = require("../../database");
const helpers_1 = require("../../helpers");
class SessionDTO {
    constructor(userKey, ipAddress) {
        this.toSession = () => __awaiter(this, void 0, void 0, function* () {
            const gmtDateExpiration = yield this.convertSessionExpirationDateToGMT();
            return new database_1.Session(this.userKey, this.token, gmtDateExpiration.toISOString());
        });
        this.convertSessionExpirationDateToGMT = () => __awaiter(this, void 0, void 0, function* () {
            yield (0, helpers_1.convertDateToGMTTimezoneFromIP)(this.dateExpiration, this.ipAddress);
            return this.dateExpiration;
        });
        this.userKey = userKey;
        this.token = (0, crypto_1.randomUUID)();
        this.dateExpiration = new Date();
        this.dateExpiration.setHours(this.dateExpiration.getHours() + 12);
        this.ipAddress = ipAddress;
    }
}
exports.SessionDTO = SessionDTO;
