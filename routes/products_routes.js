const { response, request } = require('express');
const { Router } = require('express');
const { check } = require('express-validator');
const validations = require('../middlewares/validations');
const { hasTheRole } = require('../middlewares/validate-roles')
const { validatejwt } = require('../middlewares/validate-jwt');
const { productsGet,
        productGet,
        createProduct,
        productPut,
        deleteProduct
        } = require('../controllers/products_controller');
const { categoryExistByID,
        productExistByName,
        productExistByID  } = require('../helpers/db-validators')

const router = Router();

//Obtener todas las categorias - public service
router.get('/', productsGet);

//Consulta de una producto dado -  - public service
router.get('/:id', [
    check('id', 'Product Id is not valid').isMongoId(),
    check('id').custom( (id) => productExistByID(id) ),
    validations], 
    productGet);

//Crear categoria - private service - Cualquier persona con un token valido
router.post('/', [
    validatejwt,
    check('prodName', 'Product name is required').not().isEmpty(),
    check('prodName').custom( (prodName) => productExistByName(prodName)),
    check('user', 'User id is required').not().isEmpty(),
    check('category', 'Category name is required').not().isEmpty(),
    check('category', 'Category Id is not valid').isMongoId(),
    check('category').custom( (category) => categoryExistByID(category) ),
    validations], createProduct);

//Modificar producto - private service - Cualquier persona con un token valido
router.put('/:id', [
    validatejwt,
    check('prodName', 'Product name is required').not().isEmpty(),
    check('prodName').custom( (prodName) => productExistByName(prodName)),
    check('user', 'User id is required').not().isEmpty(),
    check('user', 'User Id is not valid').isMongoId(),
    check('category', 'Category Id is not valid').isMongoId(),
    check('category').custom( (category) => categoryExistByID(category) ),
    validations], productPut);

//Borrar producto - Admin only - Cualquier persona con un token valido
router.delete('/:id', [
    validatejwt,
    //isAdminRole,
    hasTheRole('ADMIN', 'SELLS'),
    check('id', 'Product Id is not valid').isMongoId(),
    check('id').custom( (id) => productExistByID(id) ),
    validations], deleteProduct);

module.exports = router;