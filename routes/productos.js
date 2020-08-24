const express = require ('express');
const router = express.Router();
const {getProduct, getProducts, prodsHabilitados} = require ('./../models/producto');
const {getCategorias} = require('./../models/categorias');
const {agregarItem} = require('./../models/carrito');

router.get('/single/:id', async(req,res) =>{
    const {id} = req.params;
    const producto = await getProduct(id);
    console.log(producto);
    res.render('producto', {producto: producto});              
});
router.post('/single/:id', async(req,res) =>{
    const {id} =req.params;
    const producto = await getProduct(id);
    const {cantidad} = req.body;
    const precioFinal = producto.precio*cantidad;
    const object = {
        id_producto: id,
        id_usuario: req.session.userId,
        precio: precioFinal,
        cantidad: cantidad,
        nombre_producto: producto.nombre
    }
    const result = await agregarItem(object);
    console.log(result)
    if(req.session.iniciado){
        
        res.redirect('/carrito');
    } else{
        res.redirect('/login')
    }   
})


router.get('/', async(req,res) =>{
    try {
        const categs = await getCategorias();
        const prods = await prodsHabilitados();
        res.render('productos', {productos: prods, categorias: categs})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router
