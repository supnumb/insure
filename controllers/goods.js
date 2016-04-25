var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models/index');
var GoodModel = models.Good;

//打开保险商品的列表页
router.get('/', function(req, res, next) {
});


//打开保险商品详细页
router.get('/good/', function(req, res, next) {
    var goodId=req.query.id;

    if(goodId && ""!=goodId) {
        GoodModel.findOne(goodId,function(err,doc){
            res.render("good",{good:doc});
        });
    }
});

module.exports = router;
