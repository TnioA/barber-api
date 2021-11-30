import { FirebaseRepository } from '../Repositories/FirebaseRepository';
import { decode } from 'jsonwebtoken';

export default new class BarberService {

    private readonly firebaseRepository: FirebaseRepository;

    constructor() {
        this.firebaseRepository = new FirebaseRepository();
    }

    public async GetBarbers(request: any): Promise<any> {
        var response = await this.firebaseRepository.getAll('barbers');
        return { success: true, data: response, error: null };
    }

    public async GetFavoritedBarbers(request: any, user: any): Promise<any> {
        var userInDb = await this.firebaseRepository.getFirst('users', { column: 'email', operator: '==', value: user.email });
        if (userInDb === null)
            return { success: false, data: null, error: 'Usuário não encontrado.' };

        if (!userInDb.favoriteds)
            return { success: true, data: [], error: null };

        var response = await this.firebaseRepository.getAll('barbers', { column: 'id', operator: 'in', value: userInDb.favoriteds });
        return { success: true, data: response, error: null };
    }

    public async GetBarber(request: any, user: any): Promise<any> {
        if (!request.query.id)
            return { success: false, data: null, error: 'Identificador do Barbeiro não foi informado.' };

        var userInDb = await this.firebaseRepository.getFirst('users', { column: 'email', operator: '==', value: user.email });
        if (userInDb === null)
            return { success: false, data: null, error: 'Usuário não encontrado.' };

        var barber = await this.firebaseRepository.getFirstById('barbers', request.query.id);
        if (barber === null)
            return { success: false, data: null, error: 'Barbeiro não encontrado.' };

        var appointments = await this.firebaseRepository.getAll('appointments', { column: 'barber.id', operator: '==', value: barber.id });
        if (appointments === null)
            return { success: false, data: null, error: 'Barbeiro não encontrado.' };

        var available = [];
        var newDate = new Date();
        for (var i = 0; i < 10; i++) {
            var dayData = barber.available.find((x: any) => x.day === newDate.getDay());
            if (dayData) {
                var month = (newDate.getMonth() + 1) < 10 ? '0' + newDate.getMonth() + 1 : newDate.getMonth() + 1;
                var day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();

                var item = {
                    date: `${newDate.getFullYear()}-${month}-${day}`,
                    hours: dayData.hours
                };

                var appointmentsFinded = appointments.filter(y => y.date.date === item.date);
                if (appointmentsFinded.length > 0) {
                    appointmentsFinded.forEach(y => {
                        if (item.hours.includes(y.date.hour))
                            item.hours = item.hours.filter((z: string) => z !== y.date.hour);
                    })
                }

                available.push(item);
            }

            newDate.setDate(newDate.getDate() + 1);
        }

        barber.available = available;
        barber.favorited = userInDb.favoriteds.filter((x: any)=> x === barber.id).length > 0;
        return { success: true, data: barber, error: null };
    }

    public async FavoriteBarber(request: any, user: any): Promise<any> {
        if (!request.body.barberId || !request.body.state)
            return { success: false, data: null, error: 'Identificador do Barbeiro ou estado não foi informado.' };

        var userInDb = await this.firebaseRepository.getFirst('users', { column: 'email', operator: '==', value: user.email });
        if (userInDb === null)
            return { success: false, data: null, error: 'Usuário não encontrado.' };

        userInDb.favoriteds = !userInDb.favoriteds ? [] : userInDb.favoriteds;
        
        if(request.body.state){
            userInDb.favoriteds.push(request.body.barberId);
        }else{
            userInDb.favoriteds = userInDb.favoriteds.filter((x: any)=> x !== request.body.barberId);
        }

        var response = await this.firebaseRepository.update('users', userInDb);
        if (!response)
            return { success: false, data: null, error: 'Erro ao inserir dados' };

        return { success: true, data: null, error: null };
    }
}