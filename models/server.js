
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/usuarios';

        // Conectar a la BD
        this.conectarDB();

        // Middlewares
        this.middlewares();
        // Rutas de la app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares () {

        //CORS
        this.app.use(cors());

        //Body read and parsing
        this.app.use( express.json() );

        this.app.use( express.static('public'));
    }

    routes() {

        this.app.use(this.userPath, require('../routes/user_routes'));
    }

    listen() {
        this.app.listen(this.port);
    }
}




module.exports = Server;