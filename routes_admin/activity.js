/*
 * 后台管理优惠活动管理页面
 * 1、列出所有活动产品； 
 * 2、新增活动
 * 3、修改活动
 * 4、
 * */
var mongoose = require('mongoose');
var utility = require('utility');
var models = require('../models');
var config = require('../config');
var path = require('path');

var ActivityModel = models.Activity;


//上传文件操作
function uploadFile(file,callback){
    var filename = file.name;
    var extname = filename.substring(filename.indexOf('.'),filename.length);
    var time = new Date().getTime();
    filename = utility.md5(filename+time);

    var act_pic_root = config.act_pics_upload;
    var disk_file = path.join(config.app_root,act_pic_root)+filename+extname;
    console.log(disk_file);
    var virtual_file = act_pic_root+filename+extname;

    file.mv(disk_file,function(err){
        if(err)
        console.log(err);
        else 
        callback(virtual_file);
    });
};

exports.index = function(req,res,next){
    ActivityModel.find(function(err,docs){
        res.render("admin_activity",{title:"活动管理",Acts:docs});
    });
};

exports.showAdd = function(req,res,next){
    res.render("admin_activity_add",{title:"活动管理"});
};

//创建新的活动
exports.add = function(req,res,next){
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
};

//修改优惠活动
exports.showModify = function(req,res,next){
    console.log("modify---"+req.query.uid);
    ActivityModel.findById(req.query.uid,function(err,doc){
        res.render("admin_activity_modify",{title:"活动管理",act:doc,e:err});
    });
};

//保存修改之后的优惠活动
exports.modify = function(req,res,next){
    var file = req.files.pic1;

    //有上传的文件 
    if(file.name) {
        uploadFile(file,function(path) {
            var activity = { title:req.body.title,
                summary_desc:req.body.desc,
            content:req.body.content,
            pic_url:path
            };

            var uid = req.body.id;
            if(uid && ''!=uid) {
                ActivityModel.findByIdAndUpdate({_id:uid},activity,function(err,doc){
                    console.log("findByIdAndUpdate----"+err);
                    if(!err)
                    res.redirect('/admin/activity');
                });
            }
        });  
    }
    else {
        var activity = { 
            title:req.body.title,
            summary_desc:req.body.desc,
            content:req.body.content,
            pic_url:path
        };

        var uid = req.body.id;
        if(uid && ''!=uid) {
            ActivityModel.findByIdAndUpdate({_id:uid},activity,function(err,doc){
                console.log("findByIdAndUpdate----"+err);
                if(!err)
                res.redirect('/admin/activity');
            });
        }
    }
};

