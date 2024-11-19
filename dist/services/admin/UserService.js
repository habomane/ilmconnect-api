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
exports.UserService = void 0;
const database_1 = require("../../database");
class UserService {
    constructor() {
        this.createuser = (userDTO) => __awaiter(this, void 0, void 0, function* () {
            const user = yield userDTO.toUser();
            return yield this.userRepoistory.createUser(user);
        });
        this.getUser = (userKey) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepoistory.getUserByUserKey(userKey);
        });
        this.updateUser = (userKey, user) => __awaiter(this, void 0, void 0, function* () {
            yield this.userRepoistory.updateUser(userKey, user);
        });
        this.updateUserPassword = (userKey, passwordData) => __awaiter(this, void 0, void 0, function* () {
            yield this.userRepoistory.updateUserPassword(userKey, passwordData);
        });
        this.deleteUser = (userKey) => __awaiter(this, void 0, void 0, function* () {
            yield this.userRepoistory.deleteUser(userKey);
        });
        this.validateUser = (emailAddresss, password) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepoistory.validateUserCredentials(emailAddresss, password);
        });
        this.userRepoistory = new database_1.UserRepository();
    }
}
exports.UserService = UserService;
