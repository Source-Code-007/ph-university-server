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
exports.authServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ id: loginInfo.id });
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User not found!');
    }
    const decryptPass = bcrypt_1.default.compare(loginInfo.password, user.password);
    if (!decryptPass) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Incorrect password!');
    }
    const jwtPayload = { id: user.id, role: user.role };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_PRIVATE_KEY, {
        expiresIn: '100d',
    });
    return { accessToken, data: user, needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange };
});
exports.authServices = { login };
