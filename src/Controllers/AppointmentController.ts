import { Request, Response } from 'express';
import AuthExtension from '../Extensions/AuthExtension';
import HttpHelper from '../Helpers/HttpHelper';
import AppointmentService from '../Services/AppointmentService';

export default new class AppointmentController {
    public async SetAppointment(req: Request, res: Response): Promise<Response> {
        /*
            #swagger.tags = ['appointment']
            #swagger.summary = 'Set a new appointment for the user'
            #swagger.parameters['body'] = {
                in: 'body',
                schema: {
                    $barberId: '96ZRvi5QaQp7lojhpSxG',
                    $serviceId: 1,
                    $day: 1,
                    $month: 12,
                    $year: 2022,
                    $hour: '12:30'
                }
            }
            #swagger.responses[200] = { description: 'Confirmation of the appointment created.' }
            #swagger.responses[401] = { description: 'Authentication error.' }
            #swagger.security = [{ "bearerAuth": [] }]
        */
        return HttpHelper.Convert(res, await AppointmentService.SetAppointment(req, AuthExtension.DecodeToken(req.headers['authorization'])));
    }

    public async GetAppointments(req: Request, res: Response): Promise<Response> {
        /*
            #swagger.tags = ['appointment']
            #swagger.summary = 'Get appointment list for the user'
            #swagger.responses[200] = { description: 'Appointment list returned.' }
            #swagger.responses[401] = { description: 'Authentication error.' }
            #swagger.security = [{ "bearerAuth": [] }]
        */
        return HttpHelper.Convert(res, await AppointmentService.GetAppointments(AuthExtension.DecodeToken(req.headers['authorization'])));
    }
}