import { Router } from 'express';

import UserController from './Controllers/UserController';
import BarberController from './Controllers/BarberController';
import AppointmentController from './Controllers/AppointmentController';

import AuthExtension from './Extensions/AuthExtension';

const router = Router()
router.post('/api/checktoken', AuthExtension.ValidateToken, UserController.CheckToken);
router.post('/api/signin', UserController.SignIn);
router.post('/api/signup', UserController.SignUp);
router.post('/api/logout', AuthExtension.ValidateToken, UserController.Logout);

router.get('/api/getbarbers', AuthExtension.ValidateToken, BarberController.GetBarbers);
router.get('/api/getfavoritedbarbers', AuthExtension.ValidateToken, BarberController.GetFavoritedBarbers);
router.get('/api/getbarber', AuthExtension.ValidateToken, BarberController.GetBarber);
router.post('/api/favoriteBarber', AuthExtension.ValidateToken, BarberController.FavoriteBarber);

router.post('/api/setappointment', AuthExtension.ValidateToken, AppointmentController.SetAppointment);
router.get('/api/getappointments', AuthExtension.ValidateToken, AppointmentController.GetAppointments);

export default router;