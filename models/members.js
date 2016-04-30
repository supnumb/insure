/*
 * 常规业务模型库
 * 1、
 * */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 会员信息数据
 *
 *
 * */
var memberSchema = new Schema({
    name:String,
    sex:Number,   // 0 -- 未指定 1 男  2 女
    nick_name:String,
    city: String,
    province:String ,
    country: String,
    wx_openid:String,
    wx_unionid:String,
    grade:Number, //会员所属性的级别
    parent_id:Number,  //会员所属的上一级人员ID

    head_pic:String,
    group_id:Number,
    desc:String,
    account:Number,    //会员账号金额
    status:{type:Number,default:0},
    flag:{type:Number,default:0},      // 

    qr_code_pic:String, //该会员的二维码图片
    create_time:{type:Date,default:Date.now},
    update_time:{type:Date,default:Date.now}
});

/**
 * 会员的登录信息
 *
 * */
var loginSchema = new Schema({
    session_id:String,
    member:Object,
    login_time:{type:Date,default:Date.now},
    status:{type:Number,default:1},   // 1-- 登录状态
    logout_time:{type:Date}
});

mongoose.model('Member',memberSchema);
mongoose.model('Loginer',loginSchema);

