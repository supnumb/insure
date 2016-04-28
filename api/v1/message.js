var express = require('express');
var config = require('../../config');
var utility = require('utility');
//var auth = require('node-weixin-auth');
//var errors = require('web-errors').error;
//var settings = require('node-weixin-settings');

//wx 消息接口
exports.index = function(req,res,next){

    /*
       var app = {
       id:config.app_id,
       secret:config.app_secrect,
       token:config.token
       };

       var data = auth.extra(req,body);

       auth.ack(app.token,data,function(err,data){
       if(!err){
       res.send(data);
       return;
       }

       switch(err){
       case 1:
       res.send(errors.INPUT_INVALID);
       break;
       case 2:
       res.send(errors.SIGNATURE_NOT_MATCH);
       break;
       default:
       res.send(errors.UNKNOWN_ERROR);
       break;
       }
       });

       auth.tokenize(settings,app,function(err,json){
       var accessToken = json.access_token;
       });

       var messages = nodeWeixinMessage.messages;
       function text(message,res,callback,extra){
       console.log(message);
       console.log("text")
       }

       messages.on.text(text);
       messages.onXML(req.body,res,function callback(message){
       console.log("onXML")
       });

       messages.subscribe(function(message){
       console.log(message);
       });

*/
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    var token = config.token;

    var tmpArr=[token,timestamp,nonce];

    tmpArr.sort();

    var tmpStr = tmpArr.join('');

    tmpStr = utility.sha1(tmpStr);

    if(tmpStr === signature)
        res.send(echostr);
    else 
        res.send('error');
};

