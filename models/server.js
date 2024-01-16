
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            category:   '/api/categories',
            uploads:    '/api/uploads',
            product:    '/api/products',
            search:     '/api/search',
            user:       '/api/usuarios'
        }

     //   this.userPath = '/api/usuarios';
     //   this.authPath = '/api/auth';

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
        
        //File Upload Middleware
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
        
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth_routes'));
        this.app.use(this.paths.category, require('../routes/categorys_routes'));
        this.app.use(this.paths.uploads, require('../routes/upload_routes'));
        this.app.use(this.paths.product, require('../routes/products_routes'));
        this.app.use(this.paths.search, require('../routes/search_routes'));
        this.app.use(this.paths.user, require('../routes/user_routes'));
    }

    listen() {
        this.app.listen(this.port);
    }
}

module.exports = Server;