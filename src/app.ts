import express from 'express';
import cors from 'cors';
import router from './router';
import swaggerAutogen from 'swagger-autogen';
import swaggerUi from 'swagger-ui-express';
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
        this.Documentation();
    }

    private Middlewares(): void {
        this.express.use(express.json({ limit: "50mb" }));
        this.express.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
        this.express.use(cors());
    }

    private Database(): void {
        // Context.connection.sync();
        // Context.connection.sync({force: true});
    }

    private Routes(): void {
        this.express.use(router);
    }

    private async Documentation() {
        let host = 'https://barber-api-9hiu.onrender.com';

        if (this.express.get('host') === '127.0.0.1' || this.express.get('host') === 'localhost')
            host = `http://${this.express.get('host')}:${this.express.get('port')}`;

        const doc = {
            info: {
                title: "BarberApp API",
                version: "0.1.0",
                description:
                    "This is a simple API that serves a mobile application called BarberApp",
                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                    name: "Tnioa Rocha",
                    url: "https://taniorocha.com",
                    email: "hortanio@gmail.com",
                },

            },
            servers: [
                {
                    url: host,
                    description: ''
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                    }
                }
            }
        };

        const options = {
            openapi: '3.0.0',
            autoHeaders: false,
            writeOutputFile: false
        };

        const outputFile = './swagger_output.json';
        const endpointsFiles = ['./src/router.ts'];

        const swaggerdocs: any = await swaggerAutogen(options)(outputFile, endpointsFiles, doc);
        if (!swaggerdocs.success)
            throw "Error to generate swagger";

        this.express.use('/', swaggerUi.serve, swaggerUi.setup(swaggerdocs.data));
    }
}

export default new App().express;