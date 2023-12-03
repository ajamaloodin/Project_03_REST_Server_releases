
const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    userName: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
    uStatus: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

// Sobreescribe el metodo para que no se muestre el password y la version
// y solo retorne el resto de los argumentos de la peticion
UserSchema.methods.toJSON = function() {
    const {__v, password, ...restOfThem} = this.toObject();
    return restOfThem;
}

//Mongoose le va a poner una 's' al final del modelo
//en este caso sería Users
module.exports = model('User', UserSchema);