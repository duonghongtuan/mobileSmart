const History = require('../models/HistoryModels.js')

exports.createHistory = function(req, res){
    const history = new History(req.body)
    history.save().then(result => {
        res.json({history: result})
    })
}

exports.indexHistory = function(req, res){
    History.find(function (err, history) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(history);
        }
    });
}