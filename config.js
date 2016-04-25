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
    app_id:'wx4ef2b2066c2e3244',
    app_secrect:'344a03107b0499a83b826efb37f79dc0',
    token:'insure_#$%7!$5!',
};

module.exports = config;
