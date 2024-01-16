

const dbValidators  = require('./db-validators');
const generarJWT    = require('./generateJWT');
const googleVerify  = require('./google-verify');
const uploadFile    = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...generarJWT  ,
    ...googleVerify,
    ...uploadFile  
}