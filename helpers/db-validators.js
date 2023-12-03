const Role = require('../models/roles');
const User = require('../models/usuario');

const isAValidRole = async(role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error('User role is not defined in the DB collection');
    }
}

const emailExist = async(email = '') => {
    // Validar si el email existe
    const existEmail = await User.findOne({ email });

    if (existEmail) {
        throw new Error(`User with this email: ${email} already exist.`);
      };
}

const userExistByID = async( id ) => {
    // Validar si existe un User Id dado
    const userExist = await User.findById( id );

    if (!userExist) {
        throw new Error(`There is no any User with this id: ${id}`);
      };
}


module.exports = {
    isAValidRole,
    emailExist,
    userExistByID
};