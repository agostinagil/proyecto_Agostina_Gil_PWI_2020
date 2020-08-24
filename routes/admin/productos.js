const express = require ('express');
const router = express.Router();
const imgHandler = require('./../../utils/imageHandler');
const multer = require('multer');
const config = {dest: './public/tmp'};
const upload = multer(config);
const {getProducts, createProduct, updateProduc, modificarProducto, getProduct} = require('./../../models/producto');
const {getCategorias} = require('./../../models/categorias');


//"eliminar producto"
router.get('/baja/:id/:estado', async(req,res) =>{
    if(req.session.administrador){
        try {
        //aca va ajax
        var {id,estado} = req.params;
        if(estado==1){
            estado = 0;
            const result = await updateProduc(id,estado);
        }else{
            estado = 1;
            const result = await updateProduc(id,estado);
        }
        res.redirect('/admin/productos')
        
        } catch (error) {
        console.log(error)
        }
    }else{
        res.send('No tenes permisos para ingresar')
    }
})

//modificar producto
router.post('/modificar/:id', upload.single("foto"), async (req,res)=>{
    if(req.session.administrador){
        try {
            const img = imgHandler.saveImage(req.file);
            const {id} = req.params
            const {nombre, descripcion, id_categoria, precio, descuento} = req.body
            const object = {
                nombre: nombre,
                descripcion: descripcion,
                id_categoria: parseInt(id_categoria),
                precio: precio,
                descuento: descuento,
                imagen: img,
            }
            const result = await modificarProducto(id, object);
            const productos = await getProducts();
            res.render('adminProds', {productos, message: 'El producto ha sido modificado exitosamente!'});
            
        } catch (error) {
            console.log(error);
        }
    }
})
router.get('/modificar/:id', async (req,res) =>{
    try {
        if(req.session.administrador){
            const {id} = req.params
           const producto =  await getProduct(id);
           const categorias = await getCategorias();
           res.render('adminModificar', {categorias, producto});
        }else{
            res.send('No tenes permisos para ingresar')
        }   
        
    } catch (error) {
        console.log(error)
    }
});

//publicar prods
router.post('/alta', upload.single("foto"), async (req,res)=>{
    try {
        const img = imgHandler.saveImage(req.file);
        const {nombre, descripcion, id_categoria, precio, descuento} = req.body
        const object = {
            nombre: nombre,
            descripcion: descripcion,
            id_categoria: parseInt(id_categoria),
            precio: precio,
            descuento: descuento,
            imagen: img,
        }
        const result = await createProduct(object);
        const productos = await getProducts();
        console.log(`El inster id retornado es: ${result}`)
        res.render('adminProds', {productos, message: 'Producto dado de alta exitosamente!'});
        
    } catch (error) {
        console.log(error);
    }
})
router.get('/alta', async (req,res) =>{
    if(req.session.administrador){
       const categorias = await getCategorias();
       res.render('altaProds', {categorias});
    }else{
        res.send('No tenes permisos para ingresar')
    }   
});

//cargo los prods
router.get('/', async (req,res) =>{
    if(req.session.administrador){

       try {
        const productos = await getProducts();
        console.log(productos)

        res.render('adminProds', {productos});
       } catch (error) {
       constole.log(error) 
       }
    }else{
        res.send('No tenes permisos para ingresar')
    } 
});


module.exports = router