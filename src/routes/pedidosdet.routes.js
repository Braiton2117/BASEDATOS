import { Router } from "express";
import {getPedidosdet, getPedidosxiddet, postPedidosdet, putPedidosdet, patchPedidosdet, deletePedidosdet } from '../controladores/pedidosdetCtrl.js'

const router= Router()

//armar nuestras rutas
router.get('/pedidos_detalle',getPedidosdet)//select 
router.get('/pedidos_detalle/:id', getPedidosxiddet)//select con id
router.post('/pedidos_detalle', postPedidosdet)//insert
router.put('/pedidos_detalle/:id',putPedidosdet) //update
router.patch('/pedidos_detalle/:id',patchPedidosdet)//modificar
router.delete('/pedidos_detalle/:id',deletePedidosdet)//delete

export default router