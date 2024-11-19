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
exports.setCookiesMiddleware = exports.validateSessionMiddleware = void 0;
const controllers_1 = require("../controllers");
const validateSessionMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionController = new controllers_1.SessionController();
    if (req.url === "/user/login" || req.url === "/user/register") {
        next();
        return;
    }
    const isValidSession = yield sessionController.validateSession(req, res);
    if (isValidSession) {
        next();
    }
    ;
});
exports.validateSessionMiddleware = validateSessionMiddleware;
const setCookiesMiddleware = (session, response, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dateExpiredUserTimezone = yield session.getDateUserTimezone(req.ip || "");
    res.cookie("token", session.token, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: dateExpiredUserTimezone,
    });
    res.status(response.status).send(response);
});
exports.setCookiesMiddleware = setCookiesMiddleware;
