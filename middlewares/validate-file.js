
const { response, request } = require("express");

const validateUploadFile = (req=request, res=response, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No files were sent to be uploaded.'});
    }

    if (!req.files.file) {
        return res.status(400).json({
            msg: 'No files were sent to be uploaded.'});
    }

    next();

} 

module.exports = {
    validateUploadFile
}