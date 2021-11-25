const express = require('express');
const config = require('config');
const routes = require('../App/Router/Router.js');
const cors = require('cors');

module.exports = () => {
  const app = express();
  app.use(cors());

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));
  app.use(express.json({limit: "50mb"}));
  app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

  //APPLICATION ROUTES
  app.use(routes);

  return app;
};
