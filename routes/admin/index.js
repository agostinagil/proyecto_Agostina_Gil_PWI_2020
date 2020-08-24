const express = require ('express')
const router = express.Router();

router.get('/', async (req,res) =>{
    try {
        if(req.session.administrador){
            res.render('adminIndex')
        }else{
            res.send('No tenes permisos para ingresar')
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router