import { Request, Response } from 'express';
import AuthExtension from '../Extensions/AuthExtension';
import HttpHelper from '../Helpers/HttpHelper';
import UserService from '../Services/UserService';

export default new class UserController {

	public async CheckToken(req: Request, res: Response): Promise<Response> {
		return HttpHelper.Convert(res, await UserService.CheckToken(req, AuthExtension.DecodeToken(req.headers['authorization'])));
	}

	public async SignIn(req: Request, res: Response): Promise<Response> {
		return HttpHelper.Convert(res, await UserService.SignIn(req));
	}

	public async SignUp(req: Request, res: Response): Promise<Response> {
		return HttpHelper.Convert(res, await UserService.SignUp(req));
	}

	public async Logout(req: Request, res: Response): Promise<Response> {
		return HttpHelper.Convert(res, await UserService.Logout(req));
	}
}