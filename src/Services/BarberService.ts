import { FirebaseRepository } from '../Repositories/FirebaseRepository';
import BaseService from './BaseService';

export default new class BarberService extends BaseService {

    private readonly firebaseRepository: FirebaseRepository;

    constructor() {
        super();
        this.firebaseRepository = new FirebaseRepository();
    }

    public async GetBarbers(): Promise<any> {
        var response = await this.firebaseRepository.getAll('barbers');
        return this.SuccessData(response);
    }

    public async GetFavoritedBarbers(user: any): Promise<any> {
        var userInDb = await this.firebaseRepository.getFirst('users', { column: 'email', operator: '==', value: user.email });
        if (userInDb === null)
            return this.ErrorData('Usuário não encontrado.');

        if (!userInDb.favoriteds)
            return this.SuccessData([]);

        var response = await this.firebaseRepository.getAll('barbers', { column: 'id', operator: 'in', value: userInDb.favoriteds });
        return this.SuccessData(response);
    }

    public async GetBarber(request: any, user: any): Promise<any> {
        if (!request.query.id)
            return this.ErrorData('Identificador do Barbeiro não foi informado.');

        var userInDb = await this.firebaseRepository.getFirst('users', { column: 'email', operator: '==', value: user.email });
        if (userInDb === null)
            return this.ErrorData('Usuário não encontrado.');

        var barber = await this.firebaseRepository.getFirstById('barbers', request.query.id);
        if (barber === null)
            return this.ErrorData('Barbeiro não encontrado.');

        var appointments = await this.firebaseRepository.getAll('appointments', { column: 'barber.id', operator: '==', value: barber.id });
        if (appointments === null)
            return this.ErrorData('Barbeiro não encontrado.');

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
        return this.SuccessData(barber);
    }

    public async FavoriteBarber(request: any, user: any): Promise<any> {
        if (!request.body.barberId || request.body.state === undefined)
            return this.ErrorData('Identificador do Barbeiro ou estado não foi informado.');

        var userInDb = await this.firebaseRepository.getFirst('users', { column: 'email', operator: '==', value: user.email });
        if (userInDb === null)
            return this.ErrorData('Usuário não encontrado.');

        var barber = await this.firebaseRepository.getFirstById('barbers', request.body.barberId);
        if (barber === null)
            return this.ErrorData('Barbeiro não encontrado.');

        userInDb.favoriteds = !userInDb.favoriteds ? [] : userInDb.favoriteds;
        
        if(request.body.state){
            userInDb.favoriteds.push(request.body.barberId);
        }else{
            userInDb.favoriteds = userInDb.favoriteds.filter((x: any)=> x !== request.body.barberId);
        }

        var response = await this.firebaseRepository.update('users', userInDb);
        if (!response)
            return this.ErrorData('Erro ao inserir dados');

        return this.SuccessData();
    }
}