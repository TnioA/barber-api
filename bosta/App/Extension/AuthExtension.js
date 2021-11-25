class AuthExtension {
    ValidateToken = (req, res, next) => {
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
}

module.exports = new AuthExtension();