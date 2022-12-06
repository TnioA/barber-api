import { Request, Response, NextFunction } from 'express';
import { sign, verify, decode } from 'jsonwebtoken';
require('dotenv').config();

export default new class AuthExtension {
    public ValidateToken(req: Request, res: Response, next: NextFunction) {
        var authorization = req.headers['authorization']
        if (!authorization || !authorization.includes('Bearer '))
            return res.status(401).json({ success: false, error: 'token não informado' });

        var token = authorization.split(' ')[1];
        verify(token, process.env.JWT_PRIVATE_KEY, (err, decode) => {
            if (!err) {
                next();
            } else {
                return res.status(401).json({ success: false, error: err.name });
            }
        });
    }

    public GenerateToken(data: any) {
        return sign({ data: data }, process.env.JWT_PRIVATE_KEY, { expiresIn: '15m' });
    }

    public DecodeToken(token: string) {
        var token = token.split(' ')[1];
        var user: any = decode(token);

        return user.data;
    }
}