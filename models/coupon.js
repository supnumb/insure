/*
 * 常规业务模型库
 * 1、
 * */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
 * 优惠卷
 * */
var couponSchema = new Schema({
    title:String,
    desc:String,
    content:String,
    pic_url:String,   
    click_count:Number,  //点击次数
    price:Number,     // 优惠卷的价格
    status:{type:Number,default:0},    // 0  -- 未审核 1 -- 审核通过  -99 -- 下线过期产品
    flag:{type:Number,default:1},      // 1  -- 优惠卷  2 -- 代金劵  
    create_time:{type:Date,default:Date.now},
    update_time:{type:Date,default:Date.now}
});

mongoose.model('Coupon', couponSchema);
