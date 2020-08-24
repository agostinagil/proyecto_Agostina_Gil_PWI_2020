var express = require('express');
var router = express.Router();
const {loguado} = require ('./../models/login');

router.post("/", async (req,res)=>{
    var {usuario, pass} = req.body;
    const resultado = await loguado(usuario, pass);
    if(resultado.length == 1){
      console.log(resultado);
      console.log('Logueado');
      req.session.userId = resultado[0].id;
      console.log('abajo')
      console.log(req.session.userId);
      req.session.username = usuario;
      req.session.iniciado = true;
      if (resultado[0].admin == 1){
        req.session.administrador = true;
        res.redirect('/admin/index');
      }else{
        req.session.administrador = false;
        res.redirect('/carrito');
      }
    }else{
      res.render('login', {message:'Usuario o contraseña incorrecta'})
    }
})

router.get('/', async(req,res)=>{
  res.render('login')
})

module.exports = router
 