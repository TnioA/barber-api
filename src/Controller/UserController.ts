import { Request, Response} from 'express';
import HttpHelper from '../Helper/HttpHelper';
import { verify, sign, decode } from 'jsonwebtoken';
import AuthExtension from '../Extension/AuthExtension';

import data from '../../db.json';

export default new class UserController {

  public async CheckToken(req: Request, res: Response): Promise<Response> {
    var authorization = req.headers['authorization'];
    var token = authorization.split(' ')[1];
    var user: any = decode(token);

    return HttpHelper.Convert(res, { success: true, data: { token: token, avatar: user.data.avatar}, error: null });
  }

  public async SignIn(req: Request, res: Response): Promise<Response> {
    var response: any[] = [];
    
    if(!req.body.email || !req.body.password)
      return res.json({ success: false, data: null, error: 'Usuário não encontrado.' });

    data.users.map(x=> {
      if(x.email === req.body.email.toString() && x.password === req.body.password.toString())
          response.push(x);
    });
    
    if(response.length === 0)
      return HttpHelper.Convert(res, { success: false, data: null, error: 'Usuário não encontrado.' });

    var token = AuthExtension.GenerateToken({ 
      name: data.users[0].name, 
      email: data.users[0].email, 
      avatar: data.users[0].avatar
    });

    return HttpHelper.Convert(res, { success: true, data: { token: token, avatar: response[0].avatar }, error: null });
  }

  public async SignUp(req: Request, res: Response): Promise<Response> {
    var user = data.users[0];
    user.appointments = [];
    var token = AuthExtension.GenerateToken({ 
      name: data.users[0], 
      email: data.users[0].email, 
      avatar: data.users[0].avatar
    });

    return HttpHelper.Convert(res, { success: true, data: { token: token, avatar: data.users[0].avatar }, error: null });
  }

  public async Logout(req: Request, res: Response): Promise<Response> {
    return HttpHelper.Convert(res, { success: true, data: null, error: null });
  }
}