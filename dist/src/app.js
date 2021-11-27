"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
require('dotenv').config();
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.express.set('port', process.env.PORT || 5000);
        this.express.set('host', process.env.SERVER_CONFIG_HOST);
        this.Middlewares();
        this.Database();
        this.Routes();
    }
    Middlewares() {
        this.express.use(express_1.default.json({ limit: "50mb" }));
        this.express.use(express_1.default.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
        this.express.use((0, cors_1.default)());
    }
    Database() {
    }
    Routes() {
        this.express.use(router_1.default);
    }
}
exports.default = new App().express;
