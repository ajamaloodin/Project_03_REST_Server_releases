const { response, request } = require('express');
const { Router } = require('express');
const { check } = require('express-validator');
const validations = require('../middlewares/validations');
const { hasTheRole } = require('../middlewares/validate-roles');
const { validatejwt } = require('../middlewares/validate-jwt');
const { createCategory, 
        categoriesGet, 
        categoryGet,
        updateCategory,
        deleteCategory } = require('../controllers/categorys_controller');
const { categoryExistByID,
        categoryExistByName } = require('../helpers/db-validators')

const router = Router();

//Obtener todas las categorias - public service
router.get('/', categoriesGet);

//Consulta de una categoría dada -  - public service
router.get('/:id', [
    check('id', 'Category Id is not valid').isMongoId(),
    check('id').custom( (id) => categoryExistByID(id) ),
    validations], 
    categoryGet);

//Crear categoria - private service - Cualquier persona con un token valido
router.post('/', [
    validatejwt,
    check('catName', 'Category name is required').not().isEmpty(),
    check('catName').custom( (catName) => categoryExistByName(catName)),
    validations], createCategory);


//Modificar categoria - private service - Cualquier persona con un token valido
router.put('/:id', [
    validatejwt,
    check('id', 'Category Id is not valid').isMongoId(),
    check('id').custom( (id) => categoryExistByID(id) ),
    check('catName', 'Category name is required').not().isEmpty(),
    check('catName').custom( (catName) => categoryExistByName(catName)),
    validations], updateCategory);

//Borrar categoria - Admin only - Cualquier persona con un token valido
router.delete('/:id', [
    validatejwt,
    //isAdminRole,
    hasTheRole('ADMIN', 'SELLS'),
    check('id', 'Category Id is not valid').isMongoId(),
    check('id').custom( (id) => categoryExistByID(id) ),
    validations], deleteCategory);

module.exports = router;