"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseModel_1 = __importDefault(require("./ResponseModel"));
// Error handling middleware
const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    // Use the ResponseModel to format the error response
    const response = ResponseModel_1.default.error(error.message, error.code || 500);
    res
        .status(response.code)
        .json(response);
};
exports.default = errorHandler;
