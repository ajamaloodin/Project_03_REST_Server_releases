const { response, request } = require('express');
const User = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // verificar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Invalid User / Password - correo'
            })
        }
        // si el usuario esta activo
        if(!user.uStatus) {
            return res.status(400).json({
                msg: 'Invalid User / Password - status false'
            })
        }
        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Invalid User / Password - password'
            })
        }
        // Generar el JWT
        const token = await generateJWT(user.id);


        res.json({
            msg: 'User Logged in successfuly',
            user,
            token

        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong. Contact Admin'
        })
    }
}


module.exports = {
    login
}