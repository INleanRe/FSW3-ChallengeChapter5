const router = require('express').Router();
const adminProductController = require('../controller/adminProductController');
const Auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/', adminProductController.getProduct)
router.put('/:id', Auth,checkRole('admin'), adminProductController.updateProduct)
router.put('/:id', Auth,checkRole('admin'), adminProductController.editProduct)
router.delete('/:id', Auth,checkRole('admin'), adminProductController.deleteProduct)
router.post('/', Auth, checkRole('admin'), adminProductController.createProduct)

module.exports = router