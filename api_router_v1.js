var express = require('express');
var router = express.Router();
var message = require('./api/v1/message');

//微信消息接口
router.get('/wx/mess/',message.index);
router.post('/wx/mess/',message.onMess);


module.exports = router;

