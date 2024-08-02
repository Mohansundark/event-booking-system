"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseModel {
    constructor(message, code, data = null) {
        this.success = code >= 200 && code < 300;
        this.message = message;
        this.code = code;
        this.data = data;
    }
    static success(data, message = "Request was successful", code = 200) {
        return new ResponseModel(message, code, data);
    }
    static error(message = "An error occurred", code = 500) {
        return new ResponseModel(message, code);
    }
}
exports.default = ResponseModel;
