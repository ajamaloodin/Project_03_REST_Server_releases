const { Router } = require('express');
const { search } = require('../controllers/search_controller')

const router = Router();

router.get('/:colection/:term', search)


module.exports = router;
