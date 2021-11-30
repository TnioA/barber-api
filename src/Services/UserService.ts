import { decode } from 'jsonwebtoken';
import AuthExtension from '../Extensions/AuthExtension';
import { FirebaseRepository } from '../Repositories/FirebaseRepository';

export default new class UserService {
    private readonly firebaseRepository: FirebaseRepository;

    constructor() {
        this.firebaseRepository = new FirebaseRepository();
    }

	public async CheckToken(request: any, user: any): Promise<any> {
		var authorization = request.headers['authorization'];
		var token = authorization.split(' ')[1];

		return { success: true, data: { token: token, avatar: user.data.avatar }, error: null };
	}

	public async SignIn(request: any): Promise<any> {
		if (!request.body.email || !request.body.password)
			return { success: false, data: null, error: 'Email e/ou senha não informados.' };

        var userInDb = await this.firebaseRepository.getFirst('users', {column: 'email', operator: '==', value: request.body.email});
        if(userInDb === null || userInDb.password !== request.body.password)
            return { success: false, data: null, error: 'Usuário não encontrado.' };

		var token = AuthExtension.GenerateToken({
			name: userInDb.name,
			email: userInDb.email,
			avatar: userInDb.avatar
		});

		return { success: true, data: { token: token, avatar: userInDb.avatar }, error: null };
	}

	public async SignUp(request: any): Promise<any> {
        var user = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            avatar: request.body.avatar
        }

        var response = await this.firebaseRepository.add('users', user);
        if(!response)
            return { success: false, data: null, error: 'Erro ao inserir dados' };

		var token = AuthExtension.GenerateToken({
			name: request.body.name,
			email: request.body.email,
			avatar: request.body.avatar
		});

		return { success: true, data: { token: token, avatar: request.body.avatar }, error: null };
	}

	public async Logout(request: any): Promise<any> {
		return { success: true, data: null, error: null };
	}
}