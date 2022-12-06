import { FirebaseRepository } from '../Repositories/FirebaseRepository';
import BaseService from './BaseService';

export default new class AppointmentService extends BaseService {

    private readonly firebaseRepository: FirebaseRepository;

    constructor() {
        super();
        this.firebaseRepository = new FirebaseRepository();
    }

    public async GetAppointments(user: any): Promise<any> {
        var userInDb = await this.firebaseRepository.getFirst('users', {column: 'email', operator: '==', value: user.email});
        if(userInDb === null)
            return this.ErrorData('Usuário não encontrado.');

        var response = await this.firebaseRepository.getAll('appointments', { column: 'userId', operator: '==', value: userInDb.id});
        
        return this.SuccessData(response);
    }

    public async SetAppointment(request: any, user: any): Promise<any> {
        if (!request.body.barberId || !request.body.serviceId || !request.body.day || 
            !request.body.month || !request.body.year || !request.body.hour)
            return this.ErrorData('Um ou mais dados para requisição não foram informados.');

        var userInDb = await this.firebaseRepository.getFirst('users', {column: 'email', operator: '==', value: user.email});
        if(userInDb === null)
            return this.ErrorData('Usuário não encontrado.');

        var barberInDb = await this.firebaseRepository.getFirstById('barbers', request.body.barberId);
        if(barberInDb === null)
            return this.ErrorData('Barbeiro não encontrado.');

        var service = barberInDb.services.find((x: any)=> x.id === request.body.serviceId);
        if(!service)
            return this.ErrorData('Serviço não encontrado.');

        var month = request.body.month < 10 ? `0${request.body.month}` : request.body.month;
        var day = request.body.day < 10 ? `0${request.body.day}` : request.body.day;
        
        var appointment = {
            userId: userInDb.id,
            barber: { id: request.body.barberId, name: barberInDb.name, avatar: barberInDb.avatar },
            service: { id: request.body.serviceId, name: service.name, price: service.price },
            date: { date: `${request.body.year}-${month}-${day}`, hour: request.body.hour },
            active: true
        }

        var response = await this.firebaseRepository.add('appointments', appointment);
        if(!response)
            return this.ErrorData('Erro ao inserir dados');

        return this.SuccessData();
    }
}