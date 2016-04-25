/*
 * 商城优惠卷信息,展示到页面用的
 * */

var express = require('express');
var router = express.Router();
var Coupon = require('../models').Coupon;
var validator = require('validator');

exports.index = function(req,res,next){

    Coupon.find(function(err,docs){
        if(err) {
            console.log(err);
            return;
        }

        res.render('admin_coupons',{title:"优惠劵列表",Coupons:docs});  
    });
};

exports.showAdd = function(req,res,next){
    res.render('admin_coupon_add',{title:"添加优惠劵",err:""})
};

//添加优惠劵
exports.add = function(req,res,next){
    var title = validator.trim(req.body.title);
    var desc =req.body.desc;
    var content=req.body.content;
    var price=req.body.price;

    if(!validator.isNumeric(price)) {
        res.render('admin_coupon_add',{title:"添加优惠劵",err:"优惠劵价格只能是数字"});
        return;
    }

    var coupon = new Coupon({
        title:title,
        desc:desc,
        content:content,
        price:price,
        flag:req.body.flag
    });

    coupon.save(function(err,doc){
        if(err) {
            console.log(err);
            return;
        }

        res.redirect('/admin/coupon/');
    });
};

exports.showModify = function(req,res,next){
    var cid = req.query.uid;

    if(cid || ''==cid) {
        console.log(cid);

    }

    Coupon.findById(cid,function(err,doc){
        if(err){
            console.log(err);
            return;
        }

        res.render('admin_coupon_modify',{title:"修改优惠劵",Coupon:doc,err:''});
    });
};

exports.modify = function(req,res,next){
    var title = validator.trim(req.body.title);
    var desc =req.body.desc;
    var content=req.body.content;
    var price=req.body.price;

    if(!validator.isNumeric(price)) {
        res.render('admin_coupon_modify',{title:"添加优惠劵",err:"优惠劵价格只能是数字"});
        return;
    }

    var coupon = {
        title:title,
        desc:desc,
        content:content,
        price:price,
        flag:req.body.flag
    };

    var cid = req.body.id;

    if(!cid && ''==cid) {
        console.log('no_id');
        return;
    }

    Coupon.findByIdAndUpdate({_id:cid},coupon,function(err,doc){
        if(err){
            console.log(err);
        }
        else
        res.redirect('/admin/coupon/');
    });
};


