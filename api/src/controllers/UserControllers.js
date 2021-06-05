const User = require('../models/UserModels')
const bcrypt = require('bcrypt')

exports.register = function (req, res, next) {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user == null) { //Kiểm tra xem email đã được sử dụng chưa
            bcrypt.hash(req.body.password, 10, function (err, hash) { //Mã hóa mật khẩu trước khi lưu vào db
                if (err) { return next(err); }
                const user = new User(req.body)
                user.role = 'customer' //sau khi register thì role auto là customer
                user.password = hash;
                user.password_confirm = hash;
                user.save((err, result) => {
                    //if (err) { return res.json({ err }) }
                    res.json({ user: result })
                })
            })
        } else {
            res.json('Email_has_been_used')
        }
    })
}

exports.login = function (req, res) {
    User.findOne({ email: req.body.email }).exec(function (err, user) {
        if (err) {
            return res.json({ err })
        } else if (!user) {
            return res.json({ err: 'Email and Password are incorrect' })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result === true) {
                req.session.user = user
                res.json({
                    user: req.session.user,
                    "login": "success"
                })
            } else {
                return res.json({ err: 'Email and Password are incorrect' })
            }
        })
    })
}
exports.index = function(req, res){
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
}
exports.logout = function (req, res) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return res.json({ err });
            } else {
                return res.json({ 'logout': "Success" });
            }
        });
    }
}
exports.edit = function (req, res, next) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
}
exports.deleteUser = function (req, res, next) {
    User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
}

exports.editUser = function(req, res){
    User.findById(req.params.id, (err, user) => {
        if(err) {return res.json({err})}
        bcrypt.hash(req.body.password, 10, function (err, hash) { //Mã hóa mật khẩu trước khi lưu vào db
            if (err) { return next(err); }
            user.username = req.body.username
            user.password = hash;
            user.password_confirm = hash;
            user.save((err, result) => {
                //if (err) { return res.json({ err }) }
                res.json({ user: result })
            })
        })
        // user.username = req.body.username
        // user.password = req.body.password
        // user.save().then(result => {
        //     res.json({user: result})
        // })
    })
}