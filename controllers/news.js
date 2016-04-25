var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var models = require('../models');
var NewsModel = models.News;

/* 得到资讯类信息的列表 */
router.get('/', function(req, res, next) {
    NewsModel.find(function(err,docs){
        res.render('admin_goods',{title:"保险产品列表",
            Goods:docs
        });
    });  
});

/* 添加资讯类信息 */
router.post('add',function(req,res,next){
    var news = new NewsModel({
        title:"" 
    });

    news.save();

    res.render('admin_news_add',{title:"添加资讯"});
});

router.post('/modify',function(req,res,next){
    res.render('admin_good_modify',{title:"保险管理"});
});


module.exports = router;
