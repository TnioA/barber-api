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
const db_json_1 = __importDefault(require("../../db.json"));
exports.default = new class BarberController {
    GetBarbers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return HttpHelper_1.default.Convert(res, { success: true, data: { barbers: db_json_1.default.barbers, location: 'São Paulo' }, error: null });
        });
    }
    GetBarber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = [];
            db_json_1.default.barbers.map(x => {
                if (x.id === parseInt(req.query.id.toString()))
                    response.push(x);
            });
            return HttpHelper_1.default.Convert(res, {
                success: response.length > 0,
                data: response.length > 0 ? response[0] : null,
                error: response.length > 0 ? null : 'Barbeiro não encontrado.'
            });
        });
    }
    FavoriteBarber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return HttpHelper_1.default.Convert(res, { success: true, data: null, error: null });
        });
    }
};
