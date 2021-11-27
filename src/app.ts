import express from 'express';
import cors from 'cors';
import router from './router';
// import Context from './Entity/Context';
require('dotenv').config();

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.express.set('port', process.env.PORT || 5000);
        this.express.set('host', process.env.SERVER_CONFIG_HOST);

        this.Middlewares();
        this.Database();
        this.Routes();
    }

    private Middlewares(): void {
        this.express.use(express.json({limit: "50mb"}));
        this.express.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
        this.express.use(cors());
    }

    private Database(): void {
        // Context.connection.sync();
        // Context.connection.sync({force: true});
    }

    private Routes (): void {
        this.express.use(router);
    }
}

export default new App().express;