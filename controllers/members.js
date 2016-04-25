/**
 * 会员操作逻辑
 *
 * 1、微信关注
 * 关注微信公众号之后，自动成为车宝会员；
 *    A、无自己二维码； 
 *    B、可以分享上级会员的二维码
 * 2、经销商会员
 * 消费满100元之后(购买100元代金劵)，成为分销会员
 * 分销会员
 *    A、有推广二维码；(二维码有效期？)
 *    B、可以分享自己二维码； 
 * 
 * **/
var express = require('express');
var router = express.Router();
var EventProxy = require('eventproxy');
var models = require('../models');
var config = require('../config');
var qr = require("qr-image");
var path = require("path");
var fs = require("fs");
var validator = require("validator");

var Member = models.Member;
var LoginerModel = models.Loginer;

var loginsMebmer;

/**
 * 检查用户的登录信息
 * */
var checkLogin = function(sessionid){
    //sessionId 对应的状态为1 表示登录状态； 
    LoginerModel.findOne({session_id:sessionid,status:1},function(err,doc){
        loginsMebmer = doc;
    });
};

/**
 * 根据会员信息生成带有会员标识的二维码图片；用于会员推广
 *
 **/
var buildQRImage = function(mi) {

};

/**
 * 用户的个人主页
 * 登录成功之后，默认跳转到会员中心
 *
 * */
exports.index = function(req, res, next) {
    res.render('user_center',{title:"会员中心"});
};

/**
 * 会员注册功能 
 *
 * */
exports.showSignup = function(req, res, next) {
    res.render("user_signup",{title:"会员注册"});
};

//关注微信用户注册
exports.signupForWXUser = function(req,res,next){
    var openId = req.openId;
    var unionId= req.unionId;

    //检查微信会员是否曾注册过
    MemberModel.findOne({wx_unionid:openId},function(err,doc){
        if(err) {
            console.log(err);
            return;
        }

        if(!doc){
            var member = new MemberModel({
                name:'微信会员',
                sex:0,
                wx_openid:openId,
                wx_unionid:unionId
            });

            member.save(function(err,doc){
                var sign_url = config.domain+"/signup/?p="+doc._id+".png";

                if(!fs.exists(config.qr_path)) { 
                    fs.mkdirSync(config.qr_path);
                }
                var qr_path = path.join(config.qr_path,String(doc._id));

                var qr_file = fs.createWriteStream(qr_path);
                var qr_image = qr.image(sign_url,{size:10});
                qr_image.pipe(qr_file);

                res.redirect("/user_center/");
            });

        }
    });
};

/**
 * 会员注册功能 
 * */
exports.signup = function(req, res, next) {
    var parentId = req.query.parent_id;
    var loginName= validator.trim(req.body.login_name).toLowerCase();

    if(!parentId) {
        parentId = 0;
        console.log("no parent id!");
    }

    //检查会员是否注册过
    MemberModel.findOne({tele:tele},function(err,doc){
        if(err){
        console.log(err);
        return;
        }
        console.log(doc);
    });

    var member = new Member({
        name:loginName,
        parent_id:parentId,
        desc:req.body.desc,
        tele:req.body.tele
    }); 

    member.save(function(err,doc){
        var sign_url = config.domain+"/signup/?p="+doc._id+".png";

        if(!fs.exists(config.qr_path)) { 
            fs.mkdirSync(config.qr_path);
        }
        var qr_path = path.join(config.qr_path,String(doc._id));

        var qr_file = fs.createWriteStream(qr_path);
        var qr_image = qr.image(sign_url,{size:10});
        qr_image.pipe(qr_file);

        res.redirect("/user_center/");
    });
};

/**
 * 会员登录
 *
 * */
exports.showLogin = function(req, res, next) {
    res.render("user_signin",{title:"会员登录"});
};

exports.login = function(req, res, next) {
    var login_name = validator.trim(req.body.login_name).toLower();
    var pass = validator.trim(req.body.pass);
};

/**
 * 会员登出
 *
 * */
exports.signout = function(req, res, next) {

};

/**
 * 会员中心 -- 我的下级分销商
 * 下线分销商，展示出自己的一级、二级、三级分销商
 * */
exports.childs = function(req, res, next) {

    // 得到一级会员列表
    MemberModel.find({parent_id:loginsMebmer._id},function(err,docs){
        if(err) { 
            console.log("db find error:"+err);
            return;
        }

        var oneArray = docs;
        // 根据一级会员列表得到二级会员列表
        oneArray.each(function(index,one) {
            MemberModel.find({parent_id:one._id},function(err,doc){
                if(err) { 
                    console.log("db find error:"+err);
                    return;
                }

                var towArray = doc;
                //根据二级会员列表得到三级会员列表 
                twoArray.each(function(index,two) {
                    MemberModel.find({parent_id:two._id},function(err,doc){
                        if(err) { 
                            console.log("db find error:"+err);
                            return;
                        }

                        var threeArray = doc;
                        res.render("user",{title:"会员中心",
                            one_grade_users:oneArray,
                            two_grade_users:towArray,
                            three_grade_user:threeArray
                        });
                    });
                });
            });
        });
    });
};

