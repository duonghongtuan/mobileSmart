const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')

// User model
let Product = require('./products.model');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })
router.post('/upload', upload.single('image'), function (req, res, next) {
    console.log(req.file)
    const url = req.protocol + '://' + req.get('host')
    const product = new Product({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        company: req.body.company,
        image:url + '/images/' + req.file.filename
    });
    product.save().then(result => {
        res.status(201).json({
            message: "Product upload successfully!",
            productCreated: {
                name: result.name,
                desc: result.desc,
                price: result.price,
                company: result.company,
                image: result.image
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
    
})
router.route('/').get(function (req, res) {
    Product.find(function (err, products) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(products);
        }
    });
});
router.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Product.findById(id, function (err, product) {
        res.json(product);
    });
});
router.route('/update/:id').post(function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (!product)
            res.status(404).send("data is not found");
        else {
            //console.log(product);
            //product.name = req.body.name;
            //product.desc = req.body.desc;
            product.price = req.body.price;
            //product.company = req.body.company;
            //product.image = url + '/images/' + req.file.filename

            product.save().then(business => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});
router.route('/delete/:id').get(function (req, res) {
    Product.findByIdAndRemove({ _id: req.params.id }, function (err, person) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});
module.exports = router;