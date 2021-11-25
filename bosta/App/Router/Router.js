const Router = require('express');
const BarberController = require('../Controller/BarberController.js');
const AuthExtension = require('../Extension/AuthExtension.js');

const routes = Router();

routes.post('/api/checktoken', AuthExtension.ValidateToken, BarberController.CheckToken);
routes.post('/api/signin', BarberController.SignIn);
routes.post('/api/signup', BarberController.SignUp);
routes.post('/api/logout', AuthExtension.ValidateToken, BarberController.Logout);
routes.get('/api/getbarbers', BarberController.GetBarbers);
routes.get('/api/getbarber', BarberController.GetBarber);   

module.exports = Router;