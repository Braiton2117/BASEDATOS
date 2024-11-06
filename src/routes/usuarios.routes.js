import { Router } from "express";
import { getUsuarios, getUsuarioxId, postUsuarios, putUsuarios, patchUsuarios, deleteUsuarios } from "../controladores/usuariosCtrl.js";

const router= Router()

//armar nuestras rutas
router.get('/usuarios',getUsuarios)//select 
router.get('/usuarios/:id', getUsuarioxId)//select con id
router.post('/usuarios', postUsuarios)//insert
router.put('/usuarios/:id',putUsuarios) //update
router.patch('/usuarios/:id',patchUsuarios)//modificar
router.delete('/usuarios/:id',deleteUsuarios)//delete

export default router