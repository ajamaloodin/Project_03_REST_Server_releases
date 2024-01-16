
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise( (resolve, reject) => {

        const { file } = files;
        const filenameSplitted = file.name.split('.');
        const extension = filenameSplitted[ filenameSplitted.length - 1 ];

        // check if the file has a valid extension
        
        if (!validExtensions.includes(extension)) {
            return reject(`file extension: '${extension}' in not valid`);
        }

        const tempName = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        file.mv(uploadPath, (err) => {

            if (err) return reject(err);

            resolve(tempName);
        });

   });

}

module.exports = {
    uploadFile
}