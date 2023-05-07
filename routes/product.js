const router = require('express').Router();

const productController = require('../controller/productController');

const Auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole')
// product
router.get('/', productController.getProducts)
router.get('/search', productController.searchProduct)
router.get('/:id', productController.getProductById)
router.put('/:id',Auth,checkRole('admin'), productController.editProduct)
router.delete('/:id',Auth,checkRole('admin'), productController.deleteProduct)
router.post('/',Auth,checkRole('admin'), productController.createProduct)

module.exports = router