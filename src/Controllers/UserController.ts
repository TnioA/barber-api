import { Request, Response } from 'express';
import AuthExtension from '../Extensions/AuthExtension';
import HttpHelper from '../Helpers/HttpHelper';
import UserService from '../Services/UserService';

export default new class UserController {
	public async CheckToken(req: Request, res: Response): Promise<Response> {
		/*
           #swagger.tags = ['user']
           #swagger.summary = 'Check is token valid'
           #swagger.responses[200] = { description: 'Token validation result.' }
           #swagger.responses[401] = { description: 'Authentication error.' }
           #swagger.security = [{ "bearerAuth": [] }]
        */
		return HttpHelper.Convert(res, await UserService.CheckToken(req, AuthExtension.DecodeToken(req.headers['authorization'])));
	}

	public async SignIn(req: Request, res: Response): Promise<Response> {
		/*
           #swagger.tags = ['user']
           #swagger.summary = 'Signin an existent user by e-mail and password'
		   #swagger.parameters['body'] = {
                in: 'body',
                schema: {
                    $email: 'email@email.com',
                    $password: '123',
                }
            }
           #swagger.responses[200] = { description: 'Auth token returned.' }
           #swagger.responses[401] = { description: 'Authentication error.' }
        */
		return HttpHelper.Convert(res, await UserService.SignIn(req));
	}

	public async SignUp(req: Request, res: Response): Promise<Response> {
		/*
			#swagger.auto = false
           	#swagger.tags = ['user']
           	#swagger.summary = 'Create a new user and authenticate'
		   	#swagger.parameters['body'] = {
                in: 'body',
                schema: {
					$name: 'User Full Name',
                    $email: 'email@email.com',
                    $password: '123',
					$avatar: 'https://avatar-image-url.com/image.png',
                }
            }
           	#swagger.responses[200] = { description: 'Auth token returned.' }
           	#swagger.responses[401] = { description: 'Authentication error.' }
        */
		return HttpHelper.Convert(res, await UserService.SignUp(req));
	}

	public async Logout(req: Request, res: Response): Promise<Response> {
		/*
           #swagger.tags = ['user']
           #swagger.summary = 'Logout an user logged'
           #swagger.responses[200] = { description: 'User logout confirmation.' }
           #swagger.responses[401] = { description: 'Authentication error.' }
           #swagger.security = [{ "bearerAuth": [] }]
        */
		return HttpHelper.Convert(res, await UserService.Logout(req));
	}
}