"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
class HttpResponse {
    constructor(status, message, body) {
        this.status = status;
        this.message = message;
        this.response = body;
    }
}
exports.HttpResponse = HttpResponse;
