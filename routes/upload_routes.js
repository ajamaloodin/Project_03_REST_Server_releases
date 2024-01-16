const { Router } = require('express');
const { check } = require('express-validator');
const validations            = require('../middlewares/validations');
const { validateUploadFile } = require('../middlewares/validate-file');
const { loadfiles, updateImage, showImage } = require('../controllers/upload_controller');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post('/', validateUploadFile, loadfiles);

router.put('/:collection/:id', [
    validateUploadFile,
    check('id','Id is not valid').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
validations], updateImage);

router.get('/:collection/:id', [
    check('id','Id is not valid').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
validations], showImage);

module.exports = router;