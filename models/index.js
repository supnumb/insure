var mongoose = require('mongoose');
var config   = require('../config');
//var logger = require('../common/logger');

mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
    console.log(config.db);
  if (err) {
    console.log(err.message);
    //logger.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

require('./good');
require('./news');
require('./coupon');
require('./activity');
require('./ADs');
require('./members');
//require('./account');

exports.Good = mongoose.model('Good');
exports.News = mongoose.model('News');
exports.Activity = mongoose.model('Activity');
exports.AD = mongoose.model('AD');
exports.Member = mongoose.model('Member');
exports.Coupon = mongoose.model('Coupon');
//exports.Account = mongoose.model('Account',accountRecordSchema);
//exports.Loginer = mongoose.model('Loginer',loginSchema);
