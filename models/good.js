/*
 * 常规业务模型库
 * 1、
 * */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
 * 保险商品信息
 * 
 * */
var goodSchema = new Schema({
    title:String,
    desc:String,
    content:String,
    pic_url:[String],   
    click_count:Number,  //点击次数
    price:Number,     // 商品的价格
    status:Number,    // 0  -- 正常售卖   -1 -- 临时下线  -99 -- 下线过期产品
    flag:Number,      // 1  -- 推荐商品  0 -- 正常商品  
    create_time:{type:Date,default:Date.now},
    update_time:{type:Date,default:Date.now}
});

mongoose.model('Good', goodSchema);
