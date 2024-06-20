import { Request, Response } from 'express';
import AuthExtension from '../Extensions/AuthExtension';
import HttpHelper from '../Helpers/HttpHelper';
import BarberService from '../Services/BarberService';

export default new class BarberController {
    public async GetBarbers(req: Request, res: Response): Promise<Response> {
        /*
           #swagger.tags = ['barber']
           #swagger.summary = 'Get a list of barbers'
           #swagger.responses[200] = { description: 'Barber list returned.' }
           #swagger.responses[401] = { description: 'Authentication error.' }
           #swagger.security = [{ "bearerAuth": [] }]
        */
        return HttpHelper.Convert(res, await BarberService.GetBarbers());
    }

    public async GetFavoritedBarbers(req: Request, res: Response): Promise<Response> {
        /*
           #swagger.tags = ['barber']
           #swagger.summary = 'Get a list of favorite barbers'
           #swagger.responses[200] = { description: 'Favorite barber list returned.' }
           #swagger.responses[401] = { description: 'Authentication error.' }
           #swagger.security = [{ "bearerAuth": [] }]
        */
        return HttpHelper.Convert(res, await BarberService.GetFavoritedBarbers(AuthExtension.DecodeToken(req.headers['authorization'])));
    }

    public async GetBarber(req: Request, res: Response): Promise<Response> {
        /*
           #swagger.tags = ['barber']
           #swagger.summary = 'Get barber details'
            #swagger.parameters['id'] = {
                in: 'query',
                description: 'Barber identifier',
                type: 'string'
           }
           #swagger.responses[200] = { description: 'Barber details returned.' }
           #swagger.responses[401] = { description: 'Authentication error.' }
           #swagger.security = [{ "bearerAuth": [] }]
        */
        return HttpHelper.Convert(res, await BarberService.GetBarber(req, AuthExtension.DecodeToken(req.headers['authorization'])));
    }

    public async FavoriteBarber(req: Request, res: Response): Promise<Response> {
        /*
           #swagger.tags = ['barber']
           #swagger.summary = 'Set barber as favorite for user'
           #swagger.parameters['body'] = {
               in: 'body',
               schema: {
                   $barberId: '96ZRvi5QaQp7lojhpSxG',
                   $state: true,
               }
           }
           #swagger.responses[200] = { description: 'Confirmation of barber set as favorite.' }
           #swagger.responses[401] = { description: 'Authentication error.' }
           #swagger.security = [{ "bearerAuth": [] }]
        */
        return HttpHelper.Convert(res, await BarberService.FavoriteBarber(req, AuthExtension.DecodeToken(req.headers['authorization'])));
    }
}