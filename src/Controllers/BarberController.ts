import { Request, Response } from 'express';
import AuthExtension from '../Extensions/AuthExtension';
import HttpHelper from '../Helpers/HttpHelper';
import BarberService from '../Services/BarberService';

export default new class BarberController {
    public async GetBarbers(req: Request, res: Response): Promise<Response> {
        return HttpHelper.Convert(res, await BarberService.GetBarbers(req));
    }

    public async GetFavoritedBarbers(req: Request, res: Response): Promise<Response> {
        return HttpHelper.Convert(res, await BarberService.GetFavoritedBarbers(req, AuthExtension.DecodeToken(req.headers['authorization'])));
    }

    public async GetBarber(req: Request, res: Response): Promise<Response> {
        return HttpHelper.Convert(res, await BarberService.GetBarber(req));
    }

    public async FavoriteBarber(req: Request, res: Response): Promise<Response> {
        return HttpHelper.Convert(res, await BarberService.FavoriteBarber(req, AuthExtension.DecodeToken(req.headers['authorization'])));
    }
}