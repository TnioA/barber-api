"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
require('dotenv').config();
exports.default = new class AuthExtension {
    ValidateToken(req, res, next) {
        var authorization = req.headers['authorization'];
        if (!authorization || !authorization.includes('Bearer '))
            return res.status(401).json({ success: false, data: null, error: 'token não informado' });
        var token = authorization.split(' ')[1];
        console.log(process.env.JWT_PRIVATE_KEY);
        (0, jsonwebtoken_1.verify)(token, process.env.JWT_PRIVATE_KEY, (err, decode) => {
            if (!err) {
                next();
            }
            else {
                return res.status(401).json({ success: false, data: null, error: err.name });
            }
        });
    }
    GenerateToken(data) {
        return (0, jsonwebtoken_1.sign)({ data: data }, process.env.JWT_PRIVATE_KEY, { expiresIn: '5m' });
    }
};
