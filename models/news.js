/*
 * 常规业务模型库
 * 1、
 * */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 资讯类信息
 *
 * */
var newsSchema = new Schema({
    title:String,
    summary_desc:String,   //简要描述
    pic_url:[String],
    right:Number,  //权重
    content:String, 
    status:Number,
    flag:Number,
    create_time:{type:Date,default:Date.now},
    update_time:{type:Date,default:Date.now}
});

mongoose.model('News',newsSchema);
