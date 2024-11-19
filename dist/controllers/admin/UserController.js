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
exports.UserController = void 0;
const error_handling_1 = require("../../error-handling");
const middleware_1 = require("../../middleware");
const models_1 = require("../../models");
const services_1 = require("../../services");
const SessionController_1 = require("./SessionController");
class UserController {
    constructor() {
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userKey = req.params["userKey"];
                const responseBody = yield this.userService.getUser(userKey);
                const response = new models_1.HttpResponse(error_handling_1.HTTP_RESPONSE_CODE.SUCCESS, error_handling_1.APP_SUCCESS_MESSAGE.userFound, responseBody);
                res.status(response.status).send(response);
            }
            catch (error) {
                (0, middleware_1.errorMiddleware)(error, req, res);
            }
        });
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createdUserDTO = new models_1.UserDTO(req.body["firstName"], req.body["lastName"], req.body["email"], req.body["password"], req.body["timezone"], req.body["state"], req.body["country"]);
                const userKey = createdUserDTO.userKey;
                const responseBody = yield this.userService.createuser(createdUserDTO);
                const response = new models_1.HttpResponse(error_handling_1.HTTP_RESPONSE_CODE.CREATED, error_handling_1.APP_SUCCESS_MESSAGE.createdUser, responseBody);
                this.sessionController.createSession(userKey, response, req, res, next);
            }
            catch (error) {
                (0, middleware_1.errorMiddleware)(error, req, res);
            }
        });
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const responseBody = yield this.userService.validateUser(req.body["email"], req.body["password"]);
                const response = new models_1.HttpResponse(error_handling_1.HTTP_RESPONSE_CODE.SUCCESS, error_handling_1.APP_SUCCESS_MESSAGE.userAuthenticated, responseBody);
                this.sessionController.createSession(responseBody.userKey, response, req, res, next);
            }
            catch (error) {
                (0, middleware_1.errorMiddleware)(error, req, res);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userKey = req.params["userKey"];
                yield this.userService.deleteUser(userKey);
                const response = new models_1.HttpResponse(error_handling_1.HTTP_RESPONSE_CODE.SUCCESS, error_handling_1.APP_SUCCESS_MESSAGE.userDeleted);
                res.status(response.status).send(response);
            }
            catch (error) {
                (0, middleware_1.errorMiddleware)(error, req, res);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userKey = req.params["userKey"];
                const userUpdateDTO = new models_1.UserUpdateDTO(req.body["firstName"], req.body["lastName"], req.body["email"], req.body["timezone"], req.body["state"], req.body["country"]);
                yield this.userService.updateUser(userKey, userUpdateDTO);
                const response = new models_1.HttpResponse(error_handling_1.HTTP_RESPONSE_CODE.CREATED, error_handling_1.APP_SUCCESS_MESSAGE.userUpdated);
                res.status(response.status).send(response);
            }
            catch (error) {
                (0, middleware_1.errorMiddleware)(error, req, res);
            }
        });
        this.updatePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userKey = req.params["userKey"];
                const userPasswordDTO = new models_1.UserPasswordUpdateDTO(req.body["password"]);
                yield this.userService.updateUserPassword(userKey, userPasswordDTO);
                const response = new models_1.HttpResponse(error_handling_1.HTTP_RESPONSE_CODE.CREATED, error_handling_1.APP_SUCCESS_MESSAGE.userPasswordUpdated);
                res.status(response.status).send(response);
            }
            catch (error) {
                (0, middleware_1.errorMiddleware)(error, req, res);
            }
        });
        this.userService = new services_1.UserService();
        this.sessionController = new SessionController_1.SessionController();
    }
}
exports.UserController = UserController;
