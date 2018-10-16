var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// start session for an http request - response
// this will define a session property to the request object

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.codigo){
    res.redirect("/home");
  }
  res.render('index', { title: 'FunCenter',message:'' });
});

router.post('/login', function(req, res, next) {
  //res.render('login', { title: 'Login' });
      var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "dw"
    });

    con.connect(function(err) {
      if (err) throw err;
      var query ="select * from codigos where codigo = "+req.body.codigo;
      con.query( query, function (err, result,fields) {
         if (err) throw err;
         if(result.length > 0){
           //setiemos la variable de session
           req.session.codigo=result[0].codigo;
           res.redirect('/home');
         }else{
          	res.render('index', { title: 'Login',message:'Error: Código invalido' });
         }
       });
    });
});

router.get('/logout', function(req, res, next) {
  req.session.codigo ='';
  res.redirect('/');
});

router.get('/home', function(req, res, next) {
  //obtenemos el valor de una variable de session
  if(req.session.codigo){
    var value = req.session.codigo;
  }else{
    res.redirect("/");
  }
  res.render('contenido', { title: 'Inicio',codigo: value });
});


module.exports = router;
