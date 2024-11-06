import { conmysql } from "../db.js"

export const getClientes=
    async (req,res)=>{
        try {
            const [result]=await conmysql.query('select * from clientes')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar clientes"})
         }
    }

export const getclientesxid= async(req, res)=>{
    try {
        const [result]=await conmysql.query('Select * from clientes where cli_id=?',[req.params.id])
        if(result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"cliente no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const postCliente=
async (req,res)=>{
 try {
      //console.log( req.body)
   const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad}=req.body
   //console.log(cli_nombre)
   const[rows]=await conmysql.query('insert into clientes (cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad) values(?,?,?,?,?,?,?)',
    [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad])
    //const [rows]=await conmysql.query('insert into tabla(cam1,cam2)values(?,?)',[cli_nombre,cli_correo])
    res.send({
        id:rows.insertId
    })
 } catch (error) {
    return res.status(500).json({message:"error del lado del servidor"})
 }
}

export const putCliente=
async (req,res)=>{
 try {
    const {id}=req.params
   const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad}=req.body
   console.log(cli_nombre)
   const[result]=await conmysql.query('update clientes set cli_identificacion=?, cli_nombre=?, cli_telefono=?, cli_correo=?, cli_direccion=?, cli_pais=?, cli_ciudad=? where cli_id=?',
    [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad,id])
    if(result.affectedRows<=0)return res.status(404).json({
        message:"cliente no encontrado"
    })
    const [rows]=await conmysql.query('select * from clientes where cli_id=?',[id])
    res.json(rows[0])
 } catch (error) {
    return res.status(500).json({message:"error del lado del servidor"})
 }
}

export const patchCliente=
async (req,res)=>{
 try {
    const {id}=req.params
   const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad}=req.body
   console.log(cli_nombre)
   const[result]=await conmysql.query('update clientes set cli_identificacion=IFNULL(?,cli_identificacion), cli_nombre=IFNULL(?,cli_nombre), cli_telefono=IFNULL(?,cli_telefono), cli_correo=IFNULL(?,cli_correo), cli_direccion=IFNULL(?,cli_direccion), cli_pais=IFNULL(?,cli_pais), cli_ciudad=IFNULL(?,cli_ciudad) where cli_id=?',
    [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad,id])
    if(result.affectedRows<=0)return res.status(404).json({
        message:"cliente no encontrado"
    })
    const [rows]=await conmysql.query('select * from clientes where cli_id=?',[id])
    res.json(rows[0])
 } catch (error) {
    return res.status(500).json({message:"error del lado del servidor"})
 }
}

export const deleteCliente=
async(req, res)=>{
    try {
        const [rows]=await conmysql.query('delete from clientes where cli_id=?',[req.params.id])
        if (rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message:"No pudo eliminar al cliente"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({
            message:"Error del lado del servidor"
        })
    }
}
