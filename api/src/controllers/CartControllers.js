const Cart = require('../models/CartModels')

exports.createCart = function(req, res){
    const cart = new Cart(req.body)
    cart.save().then(result => {
        res.json({cart: result})
    })
}

exports.indexCart = function(req, res){
    Cart.find(function (err, carts) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(carts);
        }
    });
}

exports.editCart = function(req, res){
    Cart.findById(req.params.id, (err, cart) => {
        if(err) {return res.json({err})}
        cart.quantity = req.body.quantity
        cart.amount = req.body.amount
        cart.save().then(result => {
            res.json({cart: result})
        })
    })
}

exports.deleteCart = function(req, res){
    Cart.remove({_id: req.params.id}, (err) => {
        if(err) {return res.json({err})}
        res.json({'mess': 'Delete success'})
    })
}
exports.deleteAllCart = function(req, res){
    Cart.remove({},(err) => {
        if(err) {return res.json({err})}
        res.json({'mess': 'Delete success'})
    })
}