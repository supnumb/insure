/*
 * 后台管理保险产品管理页面
 * 1、列出所有保险产品； 
 * 2、新增保险产品
 * 3、修改保险产品
 * 4、
 * */
var mongoose = require('mongoose');
var utility = require('utility');
var models = require('../models');
var config = require('../config');
var path = require('path');
var GoodModel = models.Good;

function uploadFile(file,callback){
    var filename = file.name;
    var extname = filename.substring(filename.indexOf('.'),filename.length);
    var time = new Date().getTime();
    filename = utility.md5(filename+time);

    var good_pic_root = config.good_pics_upload;
    var disk_file = path.join(config.app_root,good_pic_root)+filename+extname;
    console.log(disk_file);
    var virtual_file = good_pic_root+filename+extname;

    file.mv(disk_file,function(err){
        if(err)
        console.log(err);
        else 
        callback(virtual_file);
    });
};


// 列出所有保险产品
exports.index = function(req,res,next){
    GoodModel.find({}).sort({'_id':-1}).exec(function(err,docs){
        res.render('admin_goods',{title:"保险产品列表",
            Goods:docs
        });
    });  
};

//跳转到添加保险产品的页面
exports.showAdd = function(req,res,next){
    res.render('admin_good_add',{title:"保险管理"});
};

//创建新的保险产品
exports.add = function(req,res,next){
    var file;
    if(req.files) {
        file = req.files.pic;
        uploadFile(file,function(filename){
            var good = new GoodModel( {
                title:req.body.title,
                desc:req.body.desc,
                content:req.body.content,
                pic_url:filename,
                flag:req.body.flag
            });

            good.save(function(err,doc){
                console.log(doc);
                res.redirect('/admin/goods/')
            });
        });
    }
    else
        res.send("no req.files");
};

//修改保险产品
exports.showModify = function(req,res,next){
    console.log("modify---"+req.query.uid);
    GoodModel.findById(req.query.uid,function(err,doc){
        res.render("admin_good_modify",{title:"保险管理",good:doc,e:err});
    });
};

//保存修改之后的商品
exports.modify = function(req,res,next){
    var file = req.files.pic;

    if(file.name){
        uploadFile(file,function(filename){
            var good = { title:req.body.title, desc:req.body.desc, content:req.body.content, pic_url:filename, flag:req.body.flag }; 
            var uid = req.body.id;
            if(uid && ''!=uid) {
                GoodModel.findByIdAndUpdate({_id:uid},good,function(err,doc){
                    if(err) console.log(err);
                    else
                    res.redirect('/admin/goods');
                });
            }
        });
    }
    else {
        var good = { title:req.body.title, desc:req.body.desc, content:req.body.content,flag:req.body.flag }; 
        var uid = req.body.id;
        if(uid && ''!=uid) {
            GoodModel.findByIdAndUpdate({_id:uid},good,function(err,doc){
                if(err) console.log(err);
                else
                res.redirect('/admin/goods');
            });
        }
    }
};
