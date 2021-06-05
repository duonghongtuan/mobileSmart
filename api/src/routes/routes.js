const express = require('express')
const router = express.Router()
const {register, login, logout, edit, index, deleteUser, editUser } = require('../controllers/UserControllers')
const {listPost, detailPost, createPost, editPost, deletePost} = require('../controllers/PostControllers')
const {PostValidator, UserValidator, editUserValidator} = require('../validators/validator')

const session = require('express-session');
const { update } = require('../../products.model')
const { createCart, indexCart, editCart, deleteCart, deleteAllCart } = require('../controllers/CartControllers')
const { createHistory, indexHistory } = require('../controllers/historyControllers')

router.use(session({
	secret: 'key',
	resave: true,
	saveUninitialized: true
}));

function requiresLogout(req, res, next){
    if (req.session && req.session.user) {
        return res.json({err: 'You must be Logout in to Login continue'});        
    } else {
        return next();
    }
}


function requiresLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.json({err: 'You must be logged in to view this page.'});
    }
}
router.post('/login', requiresLogout, login)
router.post('/register', UserValidator, register)
router.get('/logout', requiresLogin, logout)
router.get('/index', index)
router.get('/edit/:id', edit)
router.get('/delete/:id', deleteUser)
router.put('/editUser/:id', editUserValidator, editUser)
//Cart
router.post('/createCart', createCart)
router.get('/indexCart', indexCart)
router.put('/editCart/:id', editCart)
router.delete('/deleteCart/:id', deleteCart)
router.delete('/deleteAllCart', deleteAllCart)
//History
router.post('/createHistory', createHistory)
router.get('/indexHistory', indexHistory)

router.get('/posts', requiresLogin, listPost)
router.get('/post/:id',requiresLogin, detailPost)
router.post('/post/new', requiresLogin, PostValidator, createPost)
router.put('/post/:id/edit', requiresLogin, PostValidator, editPost)
router.delete('/post/:id', requiresLogin, deletePost)

module.exports = router;