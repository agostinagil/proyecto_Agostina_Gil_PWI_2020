const express = require('express');
const router = express.Router();
const {createUser} = require ('./../models/login');

router.post('/', async(req,res) =>{
    try {
        const {usuario, nombre, apellido, correo, pass} = req.body
        const object = {
            usuario: usuario,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            password: pass,
            admin: 0,
        }
        const result = await createUser(object);
        console.log(`El inster id retornado es: ${result}`)
        res.render('index', {message: 'Usuario dado de alta exitosamente!'});
        
    } catch (error) {
        console.log(error);
    }    
});

router.get('/', async(req,res) =>{
    try {
        res.render("registro");
    } catch (error) {
        console.log(error)
    }
});

module.exports = router