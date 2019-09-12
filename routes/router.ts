 import { Router, Request, Response } from 'express';
import Server from '../clases/server';



 export const router =Router();



 router.post('/mensajes', (req:Request, res: Response)=>{
    
    const cuerpo=req.body.cuerpo;
    const de = req.body.de;

    const payload={cuerpo,de}

    const server = Server.instance;
    server.io.emit('mensaje-nuevo',payload)
    res.json({
        or:true,
       cuerpo,
        de
    })

 })

 router.get('/mensajes/:id', (req:Request, res:Response)=>{

    const cuerpo=req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload={

        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado',payload);

    res.json({
        or:true,
       cuerpo,
        de,
        id
    })

 })