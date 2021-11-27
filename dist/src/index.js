"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = app_1.default.get('port');
const host = app_1.default.get('host');
app_1.default.listen(port, host, () => {
    console.log(`Served at https://${host}:${port} port`);
});
