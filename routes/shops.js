const router = require('express').Router();

const shopController = require('../controller/shopController');

const Auth = require('../middleware/auth')
const checkRole = require('../middleware/checkRole')

// shops
// tidak bisa diakses oleh selain admin dan superadmin 
// get dan search bisa diakses oleh semua role 
router.get('/', shopController.getShops)
router.get('/search', shopController.searchShops)
router.get('/:id', Auth,checkRole('admin'), shopController.getShopById)
router.put('/:id', Auth,checkRole('admin'), shopController.editShop)
router.delete('/:id', Auth,checkRole('admin'), shopController.deleteShop)
router.post('/', Auth, checkRole('admin'), shopController.createShop)

module.exports = router