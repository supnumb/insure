/*
 * d.content%>
 * 后台管理保险产品管理页面
 * 1、列出所有保险产品； 
 * 2、新增保险产品
 * 3、修改保险产品
 * 4、
 * */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models');
var config = require('../config');
var GoodModel = models.Good;

// 列出所有保险产品
router.get('/',function(req,res,next){
    GoodModel.find(function(err,docs){
        res.render('admin_goods',{title:"保险产品列表",
            Goods:docs
        });
    });  
});

//跳转到添加保险产品的页面
router.get('/add',function(req,res,next){
    res.render('admin_good_add',{title:"保险管理"});
});

//创建新的保险产品
router.post('/add',function(req,res,next){

    var good = new GoodModel( {
        title:req.body.title,
        desc:req.body.desc,
        content:req.body.content,
        pic_url:req.body.pic1,
        flag:req.body.flag
    });

    good.save(function(err,doc){
        console.log(doc);
        res.redirect('/admin/goods/')
    });
});

//修改保险产品
router.get('/modify',function(req,res,next){
    console.log("modify---"+req.query.uid);
    GoodModel.findById(req.query.uid,function(err,doc){
        res.render("admin_good_modify",{title:"保险管理",good:doc,e:err});
    });
});

//保存修改之后的商品
router.post('/modify',function(req,res,next){

    var sampleFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }

    console.log(req.files);

    /*
    var path = config.good_pics_upload;
    sampleFile = req.files.pic1;
    sampleFile.mv(path, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });
*/
    var good = {
        title:req.body.title,
        desc:req.body.desc,
        content:req.body.content,
        pic_url:req.body.pic1,
        flag:req.body.flag
    };

    var uid = req.body.id;
    console.log("modify---"+uid);
    if(uid && ''!=uid) {
        GoodModel.findByIdAndUpdate({_id:uid},good,function(err,doc){
            if(err) console.log(err);
            else
            res.redirect('/admin/goods');
        });
    }
});

module.exports = router;
