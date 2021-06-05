const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    idUser: {type: String},
    idProduct: {type: String},
    quantity: {type: Number},
    amount: {type: Number}
});

module.exports = mongoose.model('Cart', cartSchema)