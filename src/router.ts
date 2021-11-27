import { Router } from 'express';

import UserController from './Controller/UserController';
import BarberController from './Controller/BarberController';
import AppointmentController from './Controller/AppointmentController';

import AuthExtension from './Extension/AuthExtension';

const router = Router()

router.post('/api/checktoken', AuthExtension.ValidateToken, UserController.CheckToken);
router.post('/api/signin', UserController.SignIn);
router.post('/api/signup', UserController.SignUp);
router.post('/api/logout', AuthExtension.ValidateToken, UserController.Logout);

router.get('/api/getbarbers', BarberController.GetBarber);
router.get('/api/getbarber', BarberController.GetBarbers);
router.post('/api/favoriteBarber', AuthExtension.ValidateToken, BarberController.FavoriteBarber);

router.post('/api/setappointment', AuthExtension.ValidateToken, AppointmentController.SetAppointment);
router.get('/api/getappointments', AppointmentController.GetAppointments);

export default router;