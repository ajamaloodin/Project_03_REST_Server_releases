const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGO_STRING_CONNECTION);

        console.log('BD online O.O')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al Iniciar la BD');
    }

}

module.exports = {
    dbConnection
}