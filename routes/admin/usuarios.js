const express = require ( 'express');
const router = express.Router();
const {getUsuarios, updateUser, updateAdmin} = require('./../../models/login');

//Modificar admin
/*router.get('/adminCambiar/:id/:admin', async(req,res) =>{
    if(req.session.administrador){
        try {
        //aca va ajax
        var {id, admin} = req.params;
        if(admin ==0){
            admin = 1;
            const result = await updateAdmin(id,admin); 
        }else{
            admin = 0
            const result = await updateAdmin (id,admin);    
        }
        res.redirect('/admin/usuarios')
        
        } catch (error) {
        console.log(error)
        }
    }else{
        res.send('No tenes permisos para ingresar')
    }
})*/
router.put('/:id/:admin', async(req,res)=>{
    try {
        const {id,admin} = req.params;
        const result = await updateAdmin (id,admin);
        console.log(result)
        res.json({status: true});
        
    } catch (error) {
        console.log(error)
    }
})

//cambiar estado usuario
//prueba ajax
router.put('/:id/:estado', async(req,res)=>{
    try {
        const {id,estado} = req.params;
        const result = await updateUser (id,estado);
        console.log(result)
        res.json({status: true});
        
    } catch (error) {
        console.log(error)
    }
})

//cargo los usuarios
router.get('/', async (req,res) =>{
    if(req.session.administrador){
       try {
        const result = await getUsuarios();
        console.log(result)

        res.render('adminUsers', {usuarios: result});
       } catch (error) {
       constole.log(error) 
       }
    }else{
        res.send('No tenes permisos para ingresar')
    } 
});

module.exports = router