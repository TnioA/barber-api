import { Request, Response} from 'express';
import HttpHelper from '../Helper/HttpHelper';

import data from '../../db.json';

export default new class AppointmentController {

  public async GetAppointments(req: Request, res: Response): Promise<Response> {
    return HttpHelper.Convert(res, { success: true, data: data.users[0].appointments, error: null });
  }

  public async SetAppointment(req: Request, res: Response): Promise<Response> {
    return HttpHelper.Convert(res, { success: true, data: null, error: null });
  }
}