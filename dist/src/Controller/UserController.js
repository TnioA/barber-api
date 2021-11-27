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
const HttpHelper_1 = __importDefault(require("../Helper/HttpHelper"));
const jsonwebtoken_1 = require("jsonwebtoken");
const AuthExtension_1 = __importDefault(require("../Extension/AuthExtension"));
const db_json_1 = __importDefault(require("../../db.json"));
exports.default = new class UserController {
    CheckToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var authorization = req.headers['authorization'];
            var token = authorization.split(' ')[1];
            var user = (0, jsonwebtoken_1.decode)(token);
            return HttpHelper_1.default.Convert(res, { success: true, data: { token: token, avatar: user.data.avatar }, error: null });
        });
    }
    SignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = [];
            if (!req.body.email || !req.body.password)
                return res.json({ success: false, data: null, error: 'Usuário não encontrado.' });
            db_json_1.default.users.map(x => {
                if (x.email === req.body.email.toString() && x.password === req.body.password.toString())
                    response.push(x);
            });
            if (response.length === 0)
                return HttpHelper_1.default.Convert(res, { success: false, data: null, error: 'Usuário não encontrado.' });
            var token = AuthExtension_1.default.GenerateToken({
                name: db_json_1.default.users[0].name,
                email: db_json_1.default.users[0].email,
                avatar: db_json_1.default.users[0].avatar
            });
            return HttpHelper_1.default.Convert(res, { success: true, data: { token: token, avatar: response[0].avatar }, error: null });
        });
    }
    SignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = db_json_1.default.users[0];
            user.appointments = [];
            var token = AuthExtension_1.default.GenerateToken({
                name: db_json_1.default.users[0],
                email: db_json_1.default.users[0].email,
                avatar: db_json_1.default.users[0].avatar
            });
            return HttpHelper_1.default.Convert(res, { success: true, data: { token: token, avatar: db_json_1.default.users[0].avatar }, error: null });
        });
    }
    Logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return HttpHelper_1.default.Convert(res, { success: true, data: null, error: null });
        });
    }
};
