/*
 * 商城首页逻辑
 * 1、加载热销产品
 * 2、加载套餐
 * 3、异步加载广告类信息
 * */ 
var express = require('express');
var models = require('../models');
var EventProxy = require('eventproxy');

var GoodModel = models.Good;
//var couponModel = models.Coupon;  
var ActivityModel = models.Activity;  

exports.index = function(req,res){
    var ep = new EventProxy();
    ep.all("activity","commentGood","hotGood",function(activity,commentGood,hotGood){
        console.log(activity);
        res.render('index',{title:"保险产品列表",
            act:activity,
            comment_goods:commentGood,
            hot_goods:hotGood
        });
    });

    console.log("route success!");

    // 加载优惠活动
    ActivityModel.find(function(err,doc){
        if(err) console.log(err);

        if(doc.length>=1)
        ep.emit("activity",doc[0]);
    }).limit(1);

    //加载推荐套餐   flag =1 推荐
    GoodModel.find({"flag":1},function(err,docs){
        if(err) console.log(err);
        
        ep.emit("commentGood",docs);
    });  

    //加载热销产品
    GoodModel.find({"click_count":-1},function(err,doc){
        if(err) console.log(err);
        
        ep.emit("hotGood",doc); 
    });
};
