import { FirebaseRepository } from '../Repositories/FirebaseRepository';
import { decode } from 'jsonwebtoken';

export default new class AppointmentService {

    private readonly firebaseRepository: FirebaseRepository;

    constructor() {
        this.firebaseRepository = new FirebaseRepository();
    }

    public async GetAppointments(request: any, user: any): Promise<any> {
        var userInDb = await this.firebaseRepository.getFirst('users', {column: 'email', operator: '==', value: user.email});
        if(userInDb === null)
            return { success: false, data: null, error: 'Usuário não encontrado.' };

        var response = await this.firebaseRepository.getAll('appointments', { column: 'userId', operator: '==', value: userInDb.id});
        
        return { success: true, data: response, error: null };
    }

    public async SetAppointment(request: any, user: any): Promise<any> {
        var userInDb = await this.firebaseRepository.getFirst('users', {column: 'email', operator: '==', value: user.email});
        if(userInDb === null)
            return { success: false, data: null, error: 'Usuário não encontrado.' };

        var barberInDb = await this.firebaseRepository.getFirstById('barbers', request.body.barberId);
        if(barberInDb === null)
            return { success: false, data: null, error: 'Barbeiro não encontrado.' };

        var service = barberInDb.services.find((x: any)=> x.id === request.body.serviceId);
        if(!service)
            return { success: false, data: null, error: 'Serviço não encontrado.' };

        var appointment = {
            userId: userInDb.id,
            barber: { id: request.body.barberId, name: barberInDb.name, avatar: barberInDb.avatar },
            service: { id: request.body.serviceId, name: service.name, price: service.price },
            date: { date: `${request.body.year}-${request.body.month}-${request.body.day}`, hour: request.body.hour },
            active: true
        }

        var response = await this.firebaseRepository.add('appointments', appointment);
        if(!response)
            return { success: false, data: null, error: 'Erro ao inserir dados' };

        return { success: true, data: null, error: null };
    }
}