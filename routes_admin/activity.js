/*
 * 
 * 后台管理优惠活动管理页面
 * 1、列出所有活动产品； 
 * 2、新增活动
 * 3、修改活动
 * 4、
 * */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models');
var ActivityModel = models.Activity;

//mongoose.connect('mongodb://localhost/insure_db');

router.get('/',function(req,res,next){
    ActivityModel.find(function(err,docs){
        res.render("admin_activity",{title:"优惠管理",Acts:docs});
    });
});


router.get('/add',function(req,res,next){
    res.render("admin_activity_add",{title:"优惠管理"});
});


//创建新的活动
router.post('/add',function(req,res,next){
    var act = new ActivityModel({
        title:req.body.title,
        summary_desc:req.body.desc,
        content:req.body.content,
        pic_url:req.body.pic1
    });

    act.save(function(err,doc){
        console.log(doc);  
        res.redirect('/admin/activity');
    });
});

//修改优惠活动
router.get('/modify',function(req,res,next){
    console.log("modify---"+req.query.uid);
    ActivityModel.findById(req.query.uid,function(err,doc){
        res.render("admin_activity_modify",{title:"优惠管理",act:doc,e:err});
    });
});

//保存修改之后的优惠活动
router.post('/modify',function(req,res,next){
    console.log("submit ---- modify---");
    var activity = {
        title:req.body.title,
    summary_desc:req.body.desc,
    content:req.body.content,
    pic_url:req.body.pic1
    };

    var uid = req.body.id;
    console.log("modify---"+uid);
    if(uid && ''!=uid) {
        ActivityModel.findByIdAndUpdate({_id:uid},activity,function(err,doc){
            console.log("findByIdAndUpdate----"+err);
            if(!err)
            res.redirect('/admin/activity');
        });
    }
});

module.exports = router;

