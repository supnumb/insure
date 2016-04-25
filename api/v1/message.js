var express = require('express');
var config = require('../../config');
var utility = require('utility');

//wx 消息接口
exports.index = function(req,res,next){
 
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;

    var token = config.token;

    var tmpArr=[token,timestamp,nonce];

    tmpArr.sort();

    console.log(tmpArr);

    var tmpStr = tmpArr.join();
    
    console.log(tmpStr);
    tmpStr = utility.sha1(tmpStr);

    console.log(tmpStr);
    console.log(signature);
    if(tmpStr === signature)
        res.send(echostr);
    else 
        res.send('error');
};

