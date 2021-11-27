import { Request, Response, NextFunction} from 'express';
import { sign, verify } from 'jsonwebtoken';
require('dotenv').config();

export default new class AuthExtension {
  public ValidateToken(req: Request, res: Response, next: NextFunction) {
    var authorization = req.headers['authorization']
    if(!authorization || !authorization.includes('Bearer '))
      return res.status(401).json({ success: false, data: null, error: 'token não informado'});

    var token = authorization.split(' ')[1];
    console.log(process.env.JWT_PRIVATE_KEY);
    verify(token, process.env.JWT_PRIVATE_KEY, (err, decode)=> {
      if(!err) {
        next();
      } else {
        return res.status(401).json({ success: false, data: null, error: err.name});
      }
    }); 
  }

  public GenerateToken(data: any) {
    return sign({data: data}, process.env.JWT_PRIVATE_KEY, {expiresIn : '5m'});
  }
}