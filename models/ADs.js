/*
 * 常规业务模型库
 * 1、
 * */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
 * 商业广告信息类 
 *
 * */
var ADSchema = new  Schema({
    title:String,
    summary_desc:String,
    pic_url:String,
    right:Number,
    click_count:Number,  //广告被点击的次数
    status:Number,
    flag:Number,
    create_time:{type:Date,default:Date.now},
    update_time:{type:Date,default:Date.now}
});

mongoose.model('AD',ADSchema);
