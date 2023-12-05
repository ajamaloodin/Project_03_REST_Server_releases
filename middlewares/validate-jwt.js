const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuario');

const validatejwt = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json ({
            msg: 'No token found in the request'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;

        const authUser = await User.findById(uid);

        if (!authUser) {
            return res.status(401).json ({
                msg: 'Invalid token - User does not exist'
            })
        }

        //Verificar que el usuario tiene uStatus true
        if (!authUser.uStatus) {
            return res.status(401).json ({
                msg: 'Invalid token - User Status false'
            })
        }

        req.authUser = authUser;

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })

    }

   
}


module.exports = {
    validatejwt
}