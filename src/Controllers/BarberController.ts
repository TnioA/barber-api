import { Request, Response } from 'express';
import AuthExtension from '../Extensions/AuthExtension';
import HttpHelper from '../Helpers/HttpHelper';
import BarberService from '../Services/BarberService';

export default new class BarberController {
    public async GetBarbers(req: Request, res: Response): Promise<Response> {
        return HttpHelper.Convert(res, await BarberService.GetBarbers());
    }

    public async GetFavoritedBarbers(req: Request, res: Response): Promise<Response> {
        return HttpHelper.Convert(res, await BarberService.GetFavoritedBarbers(AuthExtension.DecodeToken(req.headers['authorization'])));
    }

    public async GetBarber(req: Request, res: Response): Promise<Response> {
        return HttpHelper.Convert(res, await BarberService.GetBarber(req, AuthExtension.DecodeToken(req.headers['authorization'])));
    }

    public async FavoriteBarber(req: Request, res: Response): Promise<Response> {
        return HttpHelper.Convert(res, await BarberService.FavoriteBarber(req, AuthExtension.DecodeToken(req.headers['authorization'])));
    }
}