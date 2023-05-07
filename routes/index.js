const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json')

// API docs => dokumentasi API
router.use('/api-docs', swaggerUi.serve)
router.use('/api-docs', swaggerUi.setup(swaggerDocument))

// API

const User = require('./users');
const Shop = require('./shops');
const Product = require('./product');
const admin = require('./adminProduct');
 
router.use('/api/v1/users/', User);
router.use('/api/v1/shops', Shop);
router.use('/api/v1/product', Product);
router.use('/api/v1/adminProduct', admin);

// Dashboard

module.exports = router

// get bisa diakses semua role 
// create dan update oleh admin dan superadmin
// delete oleh superadmin 
