import { Request, Response } from 'express';
import AuthExtension from '../Extensions/AuthExtension';
import HttpHelper from '../Helpers/HttpHelper';
import AppointmentService from '../Services/AppointmentService';

export default new class AppointmentController {
    public async GetAppointments(req: Request, res: Response): Promise<Response> {
        return HttpHelper.Convert(res, await AppointmentService.GetAppointments(AuthExtension.DecodeToken(req.headers['authorization'])));
    }

    public async SetAppointment(req: Request, res: Response): Promise<Response> {
        return HttpHelper.Convert(res, await AppointmentService.SetAppointment(req, AuthExtension.DecodeToken(req.headers['authorization'])));
    }
}