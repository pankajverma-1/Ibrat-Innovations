const express = require('express');
const { Auth } = require('../middlewares/auth');
const {
    hello,
    products,
    signup,
    usersLogin,
    logout,
    userAuth,
} = require('./Controller');

const router = express.Router();

router.get('/', hello);
router.get('/auth', Auth, userAuth);
router.get('/products', products);
router.post('/users/login', usersLogin);
router.post('/users/register', signup);
router.get('/user/logout', logout);
// router.get('/user/logout', logout);

module.exports = router;