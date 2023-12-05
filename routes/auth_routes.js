const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth_controller');
const validations = require('../middlewares/validations');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validations 
], login);



module.exports = router;