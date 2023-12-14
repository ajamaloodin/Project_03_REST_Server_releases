const { response, request } = require('express');
const User = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // verificar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Invalid User / Password - Email'
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

const googleSignIn = async (req = request, res = response) => {
    const {id_token} = req.body;

    try {
        
        const {name, img, email} = await googleVerify(id_token);
        

        let user = await User.findOne({ email });
        if (!user) {
            //Hay que crear el usuario
            const data = {
                userName: name,
                email,
                password: ':p',
                img,
                role: 'USER',
                google: true
            };

            user = new User( data );
            await user.save();
        }
        
        //El usuario existe, pero está marcado eliminado
        if (!user.uStatus) {
            return res.status(401).json({
                msg: 'Contact Admin. This user is blocked'
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            msg: 'User Logged in successfuly',
            user,
            token
        })

    } catch (error) {
        return res.status(400).json({
            msg: 'Google Token could not verified'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}