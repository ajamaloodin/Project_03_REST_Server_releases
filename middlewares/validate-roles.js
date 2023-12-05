const {request, response} = require('express');


const isAdminRole = (req = request, res = response, next) => {

    if (!req.authUser) {
        return res.status(500).json({
            msg: 'An attempt was made to verify user role before token'
        })
    }

    const { role, userName} = req.authUser;
    if (role !== 'ADMIN') {
        return res.status(401).json({
            msg: `User ${userName} is not an ADMIN user`
        });
    }


    next();
}

const hasTheRole = (...roles) => {

    return (req = request, res = response, next) => {

        if (!req.authUser) {
            return res.status(500).json({
                msg: 'An attempt was made to verify user role before token'
            })
        }

        if (!roles.includes( req.authUser.role )) {
            return res.status(401).json({
                msg: `User ${req.authUser.userName} is not any of this roles: ${roles}`
            });
        }

        next();
    }
}


module.exports = {
    isAdminRole,
    hasTheRole

}