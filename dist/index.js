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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./utils/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = config_1.server.SERVER_PORT;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(config_1.mongo.MONGO_CONNECTION).then(() => {
        console.log("Database synced correctly");
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    }).catch((err) => {
        console.error("Error with database synchronization: " + err.message);
    });
});
//# sourceMappingURL=index.js.map