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
exports.SessionController = void 0;
const error_handling_1 = require("../../error-handling");
const helpers_1 = require("../../helpers");
const middleware_1 = require("../../middleware");
const models_1 = require("../../models");
const services_1 = require("../../services");
class SessionController {
    constructor() {
        this.validateSession = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies["token"];
                const sessionData = yield this.sessionService.getSessionByToken(token);
                if (!(0, helpers_1.validateSessionNotExpired)(sessionData.getDateExpiration())) {
                    throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.PAGE_EXPIRED, error_handling_1.APP_ERROR_MESSAGE.sessionExpired);
                }
                return true;
            }
            catch (error) {
                (0, middleware_1.errorMiddleware)(error, req, res);
                return false;
            }
        });
        this.createSession = (userKey, returnedData, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sessionService.createSession(new models_1.SessionDTO(userKey, req.ip || ""));
                if (response) {
                    (0, middleware_1.setCookiesMiddleware)(response, returnedData, req, res, next);
                }
            }
            catch (error) {
                (0, middleware_1.errorMiddleware)(error, req, res);
            }
        });
        this.sessionService = new services_1.SessionService();
    }
}
exports.SessionController = SessionController;
