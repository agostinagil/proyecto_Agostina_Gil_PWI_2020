const express = require('express');
const router = express.Router();
const {getCarrito, eliminarItem, eliminarCant, getProdCarrito, compra, updateProduc} = require('./../models/carrito');


//VER. NO FUNCIONA
router.get('/compra/estado/id_usuario/:id',async(req,res)=>{
   if(req.session.iniciado){
       try {
           var {estado,id} = req.params;
           var id_usuario = req.session.userId;
           const object ={
               id_usuario: id_usuario,
               id: id
            }
            const result = await compra(object);
            if(estado==1){
                estado = 0;
                const result = await updateCarrito(id,estado);
            }else{
                estado = 1;
                const result = await updateCarrito(id,estado);
            }
            const carrito = await getCarrito(z)
            res.redirect('/carrito', {carrito, message: 'Tu compra está siendo procesada! En breve te enviaremos un correo electrónico con el link de pago. Muchas gracias! 😊'})

       } catch (error) {
           
       }
   }else{

   }
})

router.get('/baja/cantidad/:id', async(req,res)=>{
    try {
        if(req.session.iniciado == true){
            const {id} = req.params;
            const producto = await getProdCarrito(id);
            var cantidadFinal = producto[0].cantidad-1;
            var precioFinal = (producto[0].precio/producto[0].cantidad)*cantidadFinal;
            const result = await eliminarCant(precioFinal,cantidadFinal,id);
            res.redirect('/carrito')
        }else{
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/baja/:id', async(req,res) =>{
    if(req.session.iniciado == true){

        try {
            const {id} = req.params;
            const result = await eliminarItem (id);
            res.redirect('/carrito')
        } catch (error) {
            console.log(error)
        }
    }else{
        res.redirect('/login')
    }
})
router.get('/', async(req,res) =>{
    try {
        if(req.session.iniciado == true){
            var carritoFinal = 0;
            var id_usuario = req.session.userId;
            const carrito = await getCarrito(id_usuario);
            carrito.forEach(carrito => {
               carritoFinal = carritoFinal+carrito.precio;
            });
            res.render('carrito', {carrito, carritoFinal});
        }else{
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router