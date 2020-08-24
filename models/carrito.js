const pool = require('./../utils/bd');

getCarrito = async(id_usuario) =>{
    try {
        const query = 'SELECT * FROM ?? WHERE id_usuario = ? AND estado =1';
        const params = [process.env.TBL_CARRITO, id_usuario];
        const rows = await pool.query(query,params);
        return rows;
    } catch (error) {
        console.log(error)
    }
}

agregarItem = async(obj) =>{
    try {
        const query = 'INSERT INTO ?? SET ?';
        const params = [process.env.TBL_CARRITO, obj];
        return await pool.query(query,params)
    } catch (error) {
        console.log(error)
    }
}

eliminarItem = async(id) =>{
    try {
        const query = 'DELETE FROM ?? WHERE id = ?';
        const params = [process.env.TBL_CARRITO, id];
        return await pool.query(query, params);   
    } catch (error) {
        console.log(error)
    }
}

eliminarCant = async(precio,cantidad, id) =>{
    const query = 'UPDATE ?? SET precio = ? cantidad = ? WHERE id =?';
    const params = [process.env.TBL_CARRITO, precio,cantidad, id];
    const rows = await pool.query(query,params);
    return rows; 
}

getProdCarrito = async(id) =>{
    try {
        const query = 'SELECT * FROM ?? WHERE id = ?';
        const params = [process.env.TBL_PRODUCTO, id];
        const rows = await pool.query(query,params);
        return rows;
    } catch (error) {
        console.log(error)
    }
}

compra = async(obj) =>{
    try {
        const query = 'INSERT INTO ?? SET ?';
        const params = [process.env.TBL_COMPRA,obj];
        return await pool.query(query,params);
    } catch (error) {
        console.log(error)
    }
}

updateCarrito = async(id,estado) =>{
    const query = 'UPDATE ?? SET carrito.estado = ? WHERE id = ?';
    const params = [process.env.TBL_CARRITO, estado, id];
    return await pool.query(query,params);
}

module.exports ={
    getCarrito,
    agregarItem,
    eliminarItem,
    eliminarCant,
    getProdCarrito,
    
}