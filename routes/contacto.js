const express = require('express');
const router = express.Router();
const {main} = require('./../utils/mail');

router.get('/', (req,res) =>{
    res.render("contacto");
})


router.post('/', async (req,res) =>{
    const {email, mensaje} = req.body;
    const to = process.env.ADMIN_MAIL;
    const subject = 'Nuevo mensaje desde el sitio web'
    const html = `Se contactaron desde ${email} con la siguiente consulta: ${mensaje}`
    const finalObject = {
        to, subject, html
    }
    console.log(finalObject);
    const resultMail = await main({to, subject,html});
    console.log(resultMail);
    res.render('contacto', {message: 'Tu mensaje fue enviado con éxito! En breve nos contactaremos.'});

})
module.exports = router