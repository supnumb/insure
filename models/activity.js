/*
 * 常规业务模型库
 * 1、
 * */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * 优惠活动
 *
 * */
var activitySchema = new Schema({
    title:String,
    summary_desc:String,
    pic_url:[String],
    right:Number,
    content:String,
    status:Number,
    flag:Number,
    create_time:{type:Date,default:Date.now},
    update_time:{type:Date,default:Date.now}
});

mongoose.model('Activity',activitySchema);
