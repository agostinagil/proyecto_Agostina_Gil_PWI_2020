const pool = require ('./../utils/bd');

//Traer todos los productos
getProducts = async () => {
    try {
        const query = 'SELECT p.id,p.nombre,p.descripcion,p.precio,p.imagen,p.descuento,p.estado,c.nombre as nombreCategoria ,c.descripcion as descripcionCategoria FROM ?? as p JOIN ?? as c ON p.id_categoria = c.id order by id desc';
        const params = [process.env.TBL_PRODUCTO, process.env.TBL_CATEGORIAS];
        const rows = await pool.query(query, params);
        return rows;
    } catch (error) {
        console.log(error)
    }
}

//Traer los productos con estado 1
prodsHabilitados = async () => {
    try {
        const query = 'SELECT p.nombre,p.id_categoria, p.descripcion, p.precio, p.imagen, p.descuento, p.estado, c.nombre as nombreCat, c.id FROM ?? as p JOIN ?? as c ON p.id_categoria = c.id  order by id desc' ;
        const params = [process.env.TBL_PRODUCTO, process.env.TBL_CATEGORIAS];
        const rows = await pool.query(query, params);
        return rows;
    } catch (error) {
        console.log(error)
    }
}
//Limite de productos para index
getSomeImgProducts = async () =>{
    try {
        const query = 'SELECT imagen FROM ?? LIMIT 3';
        const params = process.env.TBL_PRODUCTO;
        const rows = await pool.query(query, params);
        return rows;
    } catch (error) {
        console.log(error)
        console.log('es este')
        
    }
}

//Traer un producto individual 
getProduct = async (id) =>{
    try {
        const query = ' SELECT id, nombre, descripcion, precio, descuento, id_categoria, imagen FROM ?? WHERE id = ?';
        const params = [process.env.TBL_PRODUCTO, id];
        const rows = await pool.query(query, params);
        return rows [0] //ver por que ese array 0
    } catch (error) {
        console.log(error)
    }
}

//Dar de alta un producto
createProduct = async (obj) =>{
    const query = 'INSERT INTO ?? SET ?';
    const params = [process.env.TBL_PRODUCTO,obj];
    const rows = await pool.query(query, params);
    return rows.insertId;
}

//Modificar estado de un producto
updateProduc = async(id,estado) =>{
    const query = 'UPDATE ?? SET producto.estado = ? WHERE id = ?';
    const params = [process.env.TBL_PRODUCTO, estado, id];
    return await pool.query(query,params);
}

//Cambiar algo del producto
modificarProducto = async(id,obj) =>{
    const query = 'UPDATE ?? SET ? WHERE id = ?';
    const params = [process.env.TBL_PRODUCTO,obj, id];
    return await pool.query(query,params);
}
module.exports = {
    getProducts,
    getSomeImgProducts,
    getProduct,
    createProduct,
    updateProduc,
    modificarProducto,
    prodsHabilitados,
}