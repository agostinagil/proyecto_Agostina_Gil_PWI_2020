const pool = require('../utils/bd');

loguado = async (usuario, pass) =>{
    try {
        const query = 'SELECT * FROM ?? WHERE usuario = ? AND password = ?';
        const params = [process.env.TBL_USUARIOS, usuario, pass];
        return await pool.query(query, params);
    } catch (error) {
        console.log(error)
    }
}

//Traer todos los usuarios
getUsuarios = async () =>{
    try {
        const query = 'SELECT * FROM ?? ORDER BY id DESC';
        const params = [process.env.TBL_USUARIOS];
        const rows = await pool.query(query, params);
        return rows
    } catch (error) {
        console.log(error)
    }
}



//Modificar un usuario (cambiar estado)
updateUser = async(id,obj) =>{
    const query = 'UPDATE ?? SET usuario.estado =? WHERE id = ?';
    const params = [process.env.TBL_USUARIOS, obj, id];
    return await pool.query(query,params);
}

//Modificar el admin del usuario
updateAdmin = async(id, obj)=>{
    const query = 'UPDATE ?? SET usuario.admin=? WHERE id =?';
    const params = [process.env.TBL_USUARIOS,obj, id];
    return await pool.query(query, params);

}

//Dar de alta un usuario
createUser = async (obj) =>{
    const query = 'INSERT INTO ?? SET ?';
    const params = [process.env.TBL_USUARIOS,obj];
    const rows = await pool.query(query, params);
    return rows.insertId;
}
module.exports = {
    loguado,
    getUsuarios,
    updateUser,
    updateAdmin,
    createUser,
}