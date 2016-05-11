
var express = require('express');

var site = require('./controllers/site.js');
var good = require('./controllers/goods.js');
var ADs = require('./controllers/ADs.js');
var news = require('./controllers/news.js');
var member = require('./controllers/members.js');
var act = require('./controllers/activities.js');
var category = require('./controllers/categories.js');
var coupon = require('./controllers/coupons.js');
var message = require('./controllers/message.js');

var admin = require('./routes_admin/index');
var admin_goods = require('./routes_admin/goods');
var admin_activity = require('./routes_admin/activity');

var router = express.Router(); 

//首页内容
router.get('/',site.index);

//用户注册登录页面
router.get('/signup',member.showSignup);
router.post('/signup/',member.signup);

router.post('/signout',member.signout);
router.get('/signin',member.showLogin);
router.post('/signin',member.login);

//用户中心功能
router.get('/user_childs/',member.childs);
router.get('/user_center/',member.index);

//优惠劵管理
router.get('/admin/coupon/',coupon.index);
router.get('/admin/coupon/add',coupon.showAdd);
router.post('/admin/coupon/add',coupon.add);
router.post('/admin/coupon/modify',coupon.modify);
router.get('/admin/coupon/modify',coupon.showModify);

//后台管理
router.get('/admin/',admin.index);
router.get('/admin/goods',admin_goods.index);
router.get('/admin/goods/add',admin_goods.showAdd);
router.post('/admin/goods/add',admin_goods.add);

router.get('/admin/goods/modify/',admin_goods.showModify);
router.post('/admin/goods/modify',admin_goods.modify);

router.get('/admin/activity/',admin_activity.index);
router.get('/admin/activity/add',admin_activity.showAdd);
router.post('/admin/activity/add',admin_activity.add);

router.get('/admin/activity/modify',admin_activity.showModify);
router.post('/admin/activity/modify',admin_activity.modify);

module.exports = router;

