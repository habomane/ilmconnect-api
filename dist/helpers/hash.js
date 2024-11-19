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
exports.validatePasswordHash = exports.hashPassword = exports.HashedPassword = void 0;
const bcrypt_1 = require("bcrypt");
class HashedPassword {
    constructor(passwordHash, salt) {
        this.passwordHash = passwordHash;
        this.salt = salt;
    }
}
exports.HashedPassword = HashedPassword;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcrypt_1.genSalt)(16);
    const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
    return new HashedPassword(hashedPassword, salt);
});
exports.hashPassword = hashPassword;
const validatePasswordHash = (password, passwordHash, salt) => __awaiter(void 0, void 0, void 0, function* () {
    const reHashedPassword = yield (0, bcrypt_1.hash)(password, salt);
    return reHashedPassword === passwordHash;
});
exports.validatePasswordHash = validatePasswordHash;
