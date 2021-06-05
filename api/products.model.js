const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
    name: {
        type: String
    },
    desc: {
        type: String
    },
    price: {
        type: String
    },
    company: {
        type: String
    },
    image: {
        type: String
    }
}, {
    collection: 'products'
})

module.exports = mongoose.model('Products', Products)