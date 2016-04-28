var express = require('express');
var config = require('../../config');
var utility = require('utility');
var nodeWeixinMessage = require('node-weixin-message');


//wx 消息接口
exports.index = function(req,res,next){

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

    /*

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
       */
};

