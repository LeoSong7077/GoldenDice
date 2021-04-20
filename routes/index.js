var express = require('express');
var router = express.Router();

/* GET rendering */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index', method: 'get'}); // 첫번째 인자 : 로드할 ejs파일 이름
});

module.exports = router;