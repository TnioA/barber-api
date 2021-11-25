class BarberController {
  
    CheckToken = ('/api/checktoken', this.ValidateToken, (req, res) => {
        var authorization = req.headers['authorization'];
        var token = authorization.split(' ')[1];
        return res.json({ success: true, data: { token: token}, error: null });
    });
  
    SignIn = ('/api/signin', (req, res) => {
        var response = [];
        
        if(!req.body.email || !req.body.password)
            return res.json({ success: false, data: null, error: 'Usuário não encontrado.' });
  
        data.users.map(x=> {
            if(x.email === req.body.email.toString() && x.password === req.body.password.toString())
                response.push(x);
        });
  
        
        if(response.length === 0)
            return res.json({ success: false, data: null, error: 'Usuário não encontrado.' });
  
  
        var token = sign({data: data.users[0]}, JWT_PRIVATE_KEY, {expiresIn : '1m'});
        return res.json({ success: true, data: { token: token}, error: null });
    });
  
    SignUp = ('/api/signup', (req, res) => {
        var token = sign({data: data.users[0]}, JWT_PRIVATE_KEY, {expiresIn : '1m'});
        return res.json({ success: true, data: { token: token}, error: null });
    });
  
    Logout = ('/api/logout', this.ValidateToken, (req, res) => {
        return res.json({ success: true, data: null, error: null });
    });
  
    GetBarbers = ('/api/getbarbers', this.ValidateToken, (req, res) => {
        return res.json({ success: true, data: { barbers: data.barbers, location: 'São Paulo'}, error: null });
    });
  
    GetBarber = ('/api/getbarber', this.ValidateToken, (req, res) => {
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
}


module.exports = new BarberController();