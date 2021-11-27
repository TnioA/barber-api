const express = require('express');
const cors = require('cors');
const {verify, sign, decode} = require('jsonwebtoken');
const data = require('./db.json');

const app = express();
app.use(cors());
app.set('port', process.env.PORT || 5000);
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const JWT_PRIVATE_KEY = 'myprivatetoken';

const ValidateToken = (req, res, next) => {
    var authorization = req.headers['authorization'];
    if(!authorization || !authorization.includes('Bearer '))
      return res.status(401).json({ success: false, data: null, error: 'token não informado'});

    var token = authorization.split(' ')[1];
    verify(token, JWT_PRIVATE_KEY, (err, decode)=> {
        if(!err) {
          next();
        } else {
          return res.status(401).json({ success: false, data: null, error: err.name});
        }
    }); 
}
app.post('/api/checktoken', ValidateToken, (req, res) => {
    var authorization = req.headers['authorization'];
    var token = authorization.split(' ')[1];
    var user = decode(token);

    return res.json({ success: true, data: { token: token, avatar: user.data.avatar}, error: null });
});

app.post('/api/signin', (req, res) => {
    var response = [];
    
    if(!req.body.email || !req.body.password)
      return res.json({ success: false, data: null, error: 'Usuário não encontrado.' });

    data.users.map(x=> {
      if(x.email === req.body.email.toString() && x.password === req.body.password.toString())
          response.push(x);
    });
    
    if(response.length === 0)
      return res.json({ success: false, data: null, error: 'Usuário não encontrado.' });

    var token = sign({data: data.users[0]}, JWT_PRIVATE_KEY, {expiresIn : '30m'});
    return res.json({ success: true, data: { token: token, avatar: response[0].avatar }, error: null });
});

app.post('/api/signup', (req, res) => {
    var token = sign({data: data.users[0]}, JWT_PRIVATE_KEY, {expiresIn : '30m'});
    return res.json({ success: true, data: { token: token}, error: null });
});

app.post('/api/logout', ValidateToken, (req, res) => {
    return res.json({ success: true, data: null, error: null });
});

app.get('/api/getbarbers', (req, res) => {
    return res.json({ success: true, data: { barbers: data.barbers, location: 'São Paulo'}, error: null });
});

app.get('/api/getbarber', (req, res) => {
    var response = [];
    data.barbers.map(x=> {
      if(x.id === parseInt(req.query.id))
          response.push(x);
    });
    
    return res.json({ 
      success: response.length > 0,
      data: response.length > 0 ? response[0] : null,
      error: response.length > 0 ? null : 'Barbeiro não encontrado.'
    });
});

app.post('/api/favoriteBarber', ValidateToken, (req, res) => {
  return res.json({ success: true, data: null, error: null });
});

app.post('/api/setappointment', ValidateToken, (req, res) => {
  return res.json({ success: true, data: null, error: null });
});

app.get('/api/getappointments', ValidateToken, (req, res) => {
  var authorization = req.headers['authorization'];
  var token = authorization.split(' ')[1];
  var user = decode(token);

  var response = [];
  data.users.map(x=> {
    if(x.email === user.data.email.toString())
      response.push(x);
  });

  if(response.length === 0)
    return res.json({ success: false, data: null, error: 'Usuário não encontrado.' });

  return res.json({ success: true, data: response[0].appointments, error: null });
});

const port = app.get('port');
app.listen(port, () => console.log(`Express started at port ${port}`));