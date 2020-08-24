const express = require('express');
const router = express.Router();
const imgHandler = require('./../../utils/imageHandler');
const multer = require('multer');
const config = {dest: './public/tmp'};
const upload = multer(config);
const {getCategorias, updCatEstado,createCateg, modificarCateg, getCateg} = require('./../../models/categorias');

//modificar categoria
router.post('/modificar/:id', upload.single("foto"), async (req,res)=>{
    if(req.session.administrador){
        try {
            const img = imgHandler.saveImage(req.file);
            const {id} = req.params
            const {nombre, descripcion} = req.body
            const object = {
                nombre: nombre,
                descripcion: descripcion,
                imagen_categoria: img,
            }
            const result = await modificarCateg(id, object);
            const categorias = await getCategorias();
            res.render('adminCategorias', {categorias, message: 'La categoría ha sido modificada exitosamente!'});
            
        } catch (error) {
            console.log(error);
        }
    }
})
router.get('/modificar/:id', async (req,res) =>{
    try {
        if(req.session.administrador){
            const {id} = req.params
           const categoria_principal =  await getCateg(id);
           res.render('modificarCateg', {categoria_principal});
        }else{
            res.send('No tenes permisos para ingresar')
        }   
        
    } catch (error) {
        console.log(error)
    }
});

//Alta categorias
router.post('/alta', upload.single("foto"), async (req,res)=>{
    try {
        const img = imgHandler.saveImage(req.file);
        const {nombre, descripcion} = req.body
        const object = {
            nombre: nombre,
            descripcion: descripcion,
            imagen_categoria: img,
        }
        const categ = await createCateg(object);
        const categorias = await getCategorias()
        res.render('adminCategorias', {categ,categorias, message: 'Producto dado de alta exitosamente!'});
        
    } catch (error) {
        console.log(error);
    }
})
router.get('/alta', async (req,res) =>{
    if(req.session.administrador){
       res.render('altaCateg');
    }else{
        res.send('No tenes permisos para ingresar')
    }   
});

router.put('/:id/:estado', async(req,res)=>{
    try {
        const {id,estado} = req.params;
        const result = await updCatEstado (id,estado);
        console.log(result)
        res.json({status: true});
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/', async(req,res) =>{
    if(req.session.administrador){
        try {
            const categorias = await getCategorias();
            res.render('adminCategorias', {categorias:categorias});
        } catch (error) {
            console.log(error)
        }
    }else{
        res.send('No tenes permisos para ingresar')
    }
})

module.exports = router