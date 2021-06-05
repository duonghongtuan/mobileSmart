const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historySchema = new Schema({
    idUser: {type: String},
    user: {type: String},
    phone: {type: String},
    products: {type: String},
    address: {type: String},
    date: {type: String},
    quantity: {type: Number},
    total: {type: Number}
});

module.exports = mongoose.model('History', historySchema)