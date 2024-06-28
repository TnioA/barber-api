import { Request, Response } from 'express';
import AuthExtension from '../Extensions/AuthExtension';
import HttpHelper from '../Helpers/HttpHelper';
import AppointmentService from '../Services/AppointmentService';

export default new class AppointmentController {
    public async SetAppointment(req: Request, res: Response): Promise<Response> {
        /*
            #swagger.tags = ['appointment']
            #swagger.summary = 'Set a new appointment for the user'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": { 
                        schema: {
                            type: "object",
                            properties: {
                                barberId: {
                                    type: "string",
                                    example: "96ZRvi5QaQp7lojhpSxG"
                                },
                                serviceId: {
                                    type: "number",
                                    example: 1
                                },
                                day: {
                                    type: "number",
                                    example: 1
                                },
                                month: {
                                    type: "number",
                                    example: 12
                                },
                                year: {
                                    type: "number",
                                    example: 2022
                                },
                                hour: {
                                    type: "string",
                                    example: "12:30"
                                }
                            },
                            required: ["barberId", "serviceId", "day", "month", "year", "hour"]
                        }
                    }
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