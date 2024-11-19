"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../../helpers");
const controllers_1 = require("../../controllers");
exports.userRouter = express_1.default.Router();
const userController = new controllers_1.UserController();
// Route only concerned with HTTP Layer
exports.userRouter.get('/:userKey', userController.getUser);
exports.userRouter.post("/register", helpers_1.registerUserValidation, userController.createUser);
exports.userRouter.post("/login", helpers_1.loginUserValidation, userController.loginUser);
exports.userRouter.delete("/delete/:userKey", userController.deleteUser);
exports.userRouter.put('/update/:userKey', helpers_1.updateUserValidation, userController.updateUser);
exports.userRouter.put('/update/password/:userKey', helpers_1.updateUserPasswordValidation, userController.updatePassword);
