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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSessionNotExpired = exports.convertDateToGMTTimezoneFromIP = exports.convertDateToUserTimezoneFromIP = exports.convertDateToGMT = exports.getTimezoneFromIP = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const error_handling_1 = require("../error-handling");
const getTimezoneFromIP = (ipAddress) => __awaiter(void 0, void 0, void 0, function* () {
    if (ipAddress === '::1' || ipAddress === '' || ipAddress === null) {
        return -5;
    }
    const response = yield fetch(`http://ip-api.com/json/${ipAddress}`);
    const geo = yield response.json();
    if (geo.status !== 'success') {
        throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
    }
    const utcOffset = moment_timezone_1.default.tz(geo.timezone).utcOffset() / 60;
    return utcOffset;
});
exports.getTimezoneFromIP = getTimezoneFromIP;
const convertDateToGMT = (date, timeDifference) => {
    const diff = date.getHours() + (-1 * timeDifference);
    date.setHours(diff);
};
exports.convertDateToGMT = convertDateToGMT;
const convertDateToUserTimezoneFromIP = (date, ipAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const timezoneOffset = yield (0, exports.getTimezoneFromIP)(ipAddress);
    return (0, exports.convertDateToGMT)(date, timezoneOffset * -1);
});
exports.convertDateToUserTimezoneFromIP = convertDateToUserTimezoneFromIP;
const convertDateToGMTTimezoneFromIP = (date, ipAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const timezoneOffset = yield (0, exports.getTimezoneFromIP)(ipAddress);
    return (0, exports.convertDateToGMT)(date, timezoneOffset);
});
exports.convertDateToGMTTimezoneFromIP = convertDateToGMTTimezoneFromIP;
const validateSessionNotExpired = (date) => {
    return date > new Date();
};
exports.validateSessionNotExpired = validateSessionNotExpired;
