/*
 * 后台管理默认界面
 * 1、显示操作说明； 
 * 2、显示快捷连接
 * 3、显示最近操作
 *
 * */

exports.index=function(req,res,next){
    res.render('admin_index',{title:"保险管理"});
};
