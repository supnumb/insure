'use strict';

var express = require('express');
var config = require('../../config');
var utility = require('utility');
var auth = require('node-weixin-auth');
var errors = require('web-errors').error;
var settings = require('node-weixin-settings');
var message = require('node-weixin-message').messages;


exports.onMess = function(req,res,next){

    //用户发送的文本消息
    message.on.text(function(mess,res,callback,extra){
        res.send(mess);
        console.log("text")
    });


    message.event.on.subscribe(function(mess){
        console.log(mess);
    });

    message.event.on.unsubscribe(function(mess){
        console.log("unsubscribe");
        console.log(mess);
    });

    var data = "";
    
    req.addListener("data",function(postData){
        console.log(data);
        data += postData;
    });

    req.addListener("end",function(){
        message.onXML(data,res,function callback(mess){
            console.log(mess);
        });

        res.end("success");
    });
};

//wx 消息接口
exports.index = function(req,res,next){
    var app = {
        id:config.app_id,
        secret:config.app_secrect,
        token:config.token
    };

    //var data = auth.extra(req,body);
    var data = {
        signature:req.query.signature,
        timestamp:req.query.timestamp,
        nonce:req.query.nonce,
        echostr:req.query.echostr
    };

    auth.ack(app.token,data,function(err,data){
        if(!err){
            res.send(data);
            return;
        }

        console.log(errors);
        switch(err){
            case 1:
                res.send(errors.INPUT_INVALID);
                break;
            case 2:
                res.send(errors.SIGNATURE_NOT_MATCH);
                break;
            default:
                res.send('errors');
                break;
        }
    });


    /*

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

