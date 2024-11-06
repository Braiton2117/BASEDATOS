import { conmysql } from "../db.js"

export const getUsuarios=
    async (req,res)=>{
        try {
            const [result]=await conmysql.query('select * from usuarios')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar usuarios"})
         }
}

export const getUsuarioxId= async(req, res)=>{
    try {
        const [result]=await conmysql.query('Select * from usuarios where usr_id=?',[req.params.id])
        if(result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"usuario no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const postUsuarios=
async (req,res)=>{
 try {
   const {usr_usuario, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body

   //Funcion creada para el codigo donde nos brinda una clave aletaroria a cada usuario ingresado 
   const generatePassword = (length = 22) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const usr_clave = generatePassword(); // Genera una clave aleatoria

   const[rows]=await conmysql.query('insert into usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) values(?,?,?,?,?,?)',
    [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo])
    res.send({
        id:rows.insertId,
        generatedPassword: usr_clave // Puedes retornar la clave generada si lo necesitas
    })
 } catch (error) {
    return res.status(500).json({message:"error del lado del servidor"})
 }
}

export const putUsuarios=
async (req,res)=>{
 try {
    const {id}=req.params
   const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body
   //console.log(usr_nombre)
   const[result]=await conmysql.query('update usuarios set usr_usuario=?, usr_clave=?, usr_nombre=?, usr_telefono=?, usr_correo=?, usr_activo=? where usr_id=?',
    [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo,id])
    if(result.affectedRows<=0)return res.status(404).json({
        message:"usuario no encontrado"
    })
    const [rows]=await conmysql.query('select * from usuarios where usr_id=?',[id])
    res.json(rows[0])
 } catch (error) {
    return res.status(500).json({message:"error del lado del servidor"})
 }
}

export const patchUsuarios=
async (req,res)=>{
 try {
    const {id}=req.params
   const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo }=req.body
   const[result]=await conmysql.query('update usuarios set usr_usuario=IFNULL(?,usr_usuario), usr_clave=IFNULL(?,usr_clave), usr_nombre=IFNULL(?,usr_nombre), usr_telefono=IFNULL(?,usr_telefono), usr_correo=IFNULL(?,usr_correo), usr_activo=IFNULL(?,usr_activo) where usr_id=?',
    [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo,id])
    if(result.affectedRows<=0)return res.status(404).json({
        message:"Usuario no encontrado"
    })
    const [rows]=await conmysql.query('select * from usuarios where usr_id=?',[id])
    res.json(rows[0])
 } catch (error) {
    return res.status(500).json({message:"error del lado del servidor"})
 }
}

export const deleteUsuarios=
async(req, res)=>{
    try {
        const [rows]=await conmysql.query('delete from usuarios where usr_id=?',[req.params.id])
        if (rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message:"No pudo eliminar el producto"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({
            message:"Error del lado del servidor"
        })
    }
}