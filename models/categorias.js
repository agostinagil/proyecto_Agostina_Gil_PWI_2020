const pool = require ('./../utils/bd');

/*getCategoriasIndex = async () =>{
    try {
        const query = 'SELECT id, nombre, descripcion,imagen_categoria FROM ?? LIMIT 3';
        const rows = await pool.query(query, process.env.TBL_CATEGORIAS);
        return rows
    } catch (error) {
        console.log(error);
    }
}*/

getCategorias = async () =>{
    try {
        const query = 'SELECT * FROM ?? ORDER BY ID DESC';
        const rows = await pool.query(query, process.env.TBL_CATEGORIAS);
        return rows
    } catch (error) {
        console.log(error);
    }
}

//modificar categoria
modificarCateg = async(id,obj) =>{
    const query = 'UPDATE ?? SET ? WHERE id = ?';
    const params = [process.env.TBL_CATEGORIAS,obj, id];
    return await pool.query(query,params);
}

//Traer una categoría individual 
getCateg = async (id) =>{
    try {
        const query = ' SELECT id, nombre, descripcion, imagen_categoria FROM ?? WHERE id = ?';
        const params = [process.env.TBL_CATEGORIAS, id];
        const rows = await pool.query(query, params);
        return rows [0] //ver por que ese array 0
    } catch (error) {
        console.log(error)
    }
}

//Dar de alta una categoria
createCateg = async (obj) =>{
    const query = 'INSERT INTO ?? SET ?';
    const params = [process.env.TBL_CATEGORIAS,obj];
    const rows = await pool.query(query, params);
    return rows.insertId;
}

updCatEstado = async(id,obj) =>{
    const query = 'UPDATE ?? SET categoria_principal.estado =? WHERE id = ?';
    const params = [process.env.TBL_CATEGORIAS, obj, id];
    return await pool.query(query,params);
}
module.exports ={
    getCategorias,
    updCatEstado,
    createCateg,
    modificarCateg,
    getCateg
}