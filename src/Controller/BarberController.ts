import { Request, Response} from 'express';
import HttpHelper from '../Helper/HttpHelper';

import data from '../../db.json';

export default new class BarberController {
  public async GetBarbers(req: Request, res: Response): Promise<Response> {
    return HttpHelper.Convert(res, { success: true, data: { barbers: data.barbers, location: 'São Paulo'}, error: null });
  }

  public async GetBarber(req: Request, res: Response): Promise<Response> {
    var response: any[] = [];

    if(!req.query.id)
      return HttpHelper.Convert(res, { 
        success: false,
        data: null,
        error: 'Barbeiro não encontrado.'
      });

    data.barbers.map(x=> {
      if(x.id === parseInt(req.query.id.toString()))
          response.push(x);
    });

    return HttpHelper.Convert(res, { 
      success: response.length > 0,
      data: response.length > 0 ? response[0] : null,
      error: response.length > 0 ? null : 'Barbeiro não encontrado.'
    });
  }  

  public async FavoriteBarber(req: Request, res: Response): Promise<Response> {
    return HttpHelper.Convert(res, { success: true, data: null, error: null });
  } 
}