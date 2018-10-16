var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FunCenter' });
});

router.post('/login', function(req, res, next) {
  //res.render('login', { title: 'Login' });
  	if(req.body.codigo=='242425'){
  		res.render('contenido', { title: 'Home' });
  	}else{
  		res.render('index', { title: 'Login',message:'Error' });
  	}
  	

});

module.exports = router;
