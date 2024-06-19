import AuthExtension from '../Extensions/AuthExtension';
import { FirebaseRepository } from '../Repositories/FirebaseRepository';
import BaseService from './BaseService';

export default new class UserService extends BaseService {
	private readonly firebaseRepository: FirebaseRepository;

	constructor() {
		super();
		this.firebaseRepository = new FirebaseRepository();
	}

	public async CheckToken(request: any, user: any): Promise<any> {
		var authorization = request.headers['authorization'];
		var token = authorization.replace('Bearer ', '').replace('bearer ', '');

		return this.SuccessData({ token: token, avatar: user.avatar });
	}

	public async SignIn(request: any): Promise<any> {
		if (!request.body.email || !request.body.password)
			return this.ErrorData('Email e/ou senha não informados.');

		var userInDb = await this.firebaseRepository.getFirst('users', { column: 'email', operator: '==', value: request.body.email });
		if (userInDb === null || userInDb.password !== request.body.password)
			return this.ErrorData('Usuário não encontrado.');

		var token = AuthExtension.GenerateToken({
			name: userInDb.name,
			email: userInDb.email,
			avatar: userInDb.avatar
		});

		return this.SuccessData({ token: token, avatar: userInDb.avatar });
	}

	public async SignUp(request: any): Promise<any> {
		var user = {
			name: request.body.name,
			email: request.body.email,
			password: request.body.password,
			avatar: request.body.avatar
		}

		var response = await this.firebaseRepository.add('users', user);
		if (!response)
			return this.ErrorData('Erro ao inserir dados');

		var token = AuthExtension.GenerateToken({
			name: request.body.name,
			email: request.body.email,
			avatar: request.body.avatar
		});

		return this.SuccessData({ token: token, avatar: request.body.avatar });
	}

	public async Logout(request: any): Promise<any> {
		return this.SuccessData();
	}
}