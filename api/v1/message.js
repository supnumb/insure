'use strict';

var express = require('express');
var config = require('../../config');
var utility = require('utility');
var auth = require('node-weixin-auth');
var errors = require('web-errors').error;
var settings = require('node-weixin-settings');
var message = require('node-weixin-message').messages;
var user = require('node-weixin-user');

exports.onMess = function(req,res,next){
    message.on.text(function(mess,res,callback,extra){
        console.log(mess);
        console.log("text")
    });

    message.subscribe(function(mess){
        var app = {
            id:config.app_id,
        secret:config.app_secrect,
        token:config.token
        };

        user.profile(settings, app, process.env.APP_OPENID, function (error, data) {


        });

        console.log(mess);
    });

    message.onXML(req.body,res,function callback(mess){
        console.log(mess);
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

