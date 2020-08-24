var express = require('express');
var router = express.Router();
const {getSomeImgProducts} = require ('./../models/producto');
const {getCategorias} = require ('./../models/categorias');


/* GET home page. */
router.get('/', async (req, res) => {
  const categ = await getCategorias();
  const prodsBanner = await getSomeImgProducts();
  console.log(categ);
  res.render('index', { title: 'HOME' , 
  //productos: productos,
  categorias: categ,
  banner: prodsBanner});
});

module.exports = router;
