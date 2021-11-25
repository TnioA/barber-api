const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.set('port', process.env.PORT || 5000);
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));




// DB local (tempo de execução)
const data = [];

// criação de rota que será acessada utilizando o método HTTP GET/
// http://localhost:9000/
app.get('/bosta', (req, res) => {
  return res.json({ data });
});



app.listen(5000, () => console.log('Express started at http://localhost:5000'));