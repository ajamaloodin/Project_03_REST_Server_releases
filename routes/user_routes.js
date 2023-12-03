const { Router } = require('express');
const { check } = require('express-validator');


const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete, 
        usersPatch } = require('../controllers/user_controller');

const validations = require('../middlewares/validations');
const { isAValidRole,
        emailExist,
        userExistByID } = require('../helpers/db-validators');


const roles = require('../models/roles');

const router = Router();

router.get('/', usersGet);

router.post('/', [ 
        check('userName', 'User name is required').not().isEmpty(), 
        check('password', 'Password must be at least 8 char long').isLength({ min: 8}), 
        //check('email', 'Invalid email address').isEmail(),
        check('email').custom( (email) => emailExist(email) ),
        //check('role', 'Undefined role').isIn(['ADMIN', 'USER']),
        check('role').custom( (role) => isAValidRole(role) ),
        validations
 ] ,usersPost);

router.put('/:id', [
        check('id', 'User Id is not valid').isMongoId(),
        check('id').custom( (id) => userExistByID(id) ),
        check('role').custom( (role) => isAValidRole(role) ),
        validations
], usersPut);

router.patch('/', usersPatch);

router.delete('/:id', [
        check('id', 'User Id is not valid').isMongoId(),
        check('id').custom( (id) => userExistByID(id) ),
        validations
], usersDelete);

module.exports = router;