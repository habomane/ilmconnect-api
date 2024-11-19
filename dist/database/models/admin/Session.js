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
exports.Session = void 0;
const helpers_1 = require("../../../helpers");
class Session {
    constructor(userKey, token, dateExpiration) {
        this.getDateUserTimezone = (ipAddress) => __awaiter(this, void 0, void 0, function* () {
            const date = new Date(this.dateExpiration);
            yield (0, helpers_1.convertDateToUserTimezoneFromIP)(date, ipAddress);
            return date;
        });
        this.getDateExpiration = () => {
            return new Date(this.dateExpiration);
        };
        this.userKey = userKey;
        this.dateExpiration = dateExpiration;
        this.token = token;
    }
}
exports.Session = Session;
