var path = require('path');

/**
 * 
 * */
var config = {

    debug:true,

    domain:"http://127.0.0.1/",


    //二维码存入路径
    qr_path:path.join(__dirname,"/public/qr/"),

    //mongodb 配置;
    db: 'mongodb://127.0.0.1/insure_db',

    // upload file path
    pic_upload:'/uploads/pics/',
    good_pics_upload:'/uploads/pics/good_pics/',
    act_pics_upload:'/uploads/pics/act_pics/',

    //winxin 配置
    app_id:'wxfdaca8ab1a3ce70f',
    app_secrect:'661054be79e0f92a67b77cfb3a15b64c',
    token:'insure34P72wq'
};

module.exports = config;
