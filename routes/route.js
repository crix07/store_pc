const express = require('express');
const router = express.Router();
const User = require('../models/user');
const path = require('path');
const UserController = require('../controllers/user');
const AmazonController = require('../controllers/amazon');
const ProductController = require('../controllers/products');

const auth = require('../middlewares/authenticated');

const multiPart = require('connect-multiparty')
const upload = multiPart({ uploadDir: './public/src/assets/images/users'})

router.get('/getusers', UserController.getUsers);

router.post('/register', UserController.saveUser);

router.post('/login', UserController.login);

router.get('/protegida', auth.ensureAuth, UserController.protegida);

router.put('/update-user/:id', auth.ensureAuth, UserController.updateUser);

router.post('/image-user/:id', [auth.ensureAuth, upload], UserController.uploadImage);

router.get('/get-image-file/:imageFile', UserController.getImageFile);

router.get('/amazon/:keyword/:pages?', AmazonController.amazon);

router.get('/searchone/:id', AmazonController.searchOne);

router.get('/similares/:item', AmazonController.similar);

router.delete('/delete-user/:id', UserController.destroyAccount);

router.post('/saveProducts', ProductController.addProducts);

router.get('/getProducts/:id', ProductController.getProducts);

router.delete('/destroy-product/:id', ProductController.deleteProduct);

router.delete('/remove-all/:items', ProductController.borrarAll);

router.put('/update-product/:item', ProductController.updateProduct);

module.exports = router;
