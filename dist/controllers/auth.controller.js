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
exports.login = exports.register = void 0;
const user_service_1 = require("../services/user.service");
const token_util_1 = require("../utils/token.util");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = (yield (0, user_service_1.registerUser)(username, email, password));
        const token = (0, token_util_1.generateToken)(user._id.toString(), user.role);
        res.status(201).json({ user, token });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = (yield (0, user_service_1.loginUser)(email, password));
        const token = (0, token_util_1.generateToken)(user._id.toString(), user.role);
        res.status(200).json({ user, token });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
