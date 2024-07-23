"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.mongo = exports.MONGO_OPTIONS = exports.MONGO_PASSWORD = exports.MONGO_USER = exports.MONGO_DATABASE = exports.MONGO_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGO_URL = process.env.MONGO_URL;
exports.MONGO_DATABASE = process.env.MONGO_DATABASE;
exports.MONGO_USER = process.env.MONGO_USER;
exports.MONGO_PASSWORD = process.env.MONGO_PASSWORD;
exports.MONGO_OPTIONS = { retryWrites: true, w: 'majority' };
exports.mongo = {
    MONGO_URL: exports.MONGO_URL,
    MONGO_DATABASE: exports.MONGO_DATABASE,
    MONGO_USER: exports.MONGO_USER,
    MONGO_PASSWORD: exports.MONGO_PASSWORD,
    MONGO_CONNECTION: `mongodb://${exports.MONGO_USER}:${exports.MONGO_PASSWORD}@${exports.MONGO_URL}/${exports.MONGO_DATABASE}?authSource=admin`
};
exports.server = {
    SERVER_HOSTNAME: process.env.SERVER_HOSTNAME,
    SERVER_PORT: process.env.PORT
};
//# sourceMappingURL=config.js.map