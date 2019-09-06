 import { Router, Request, Response } from 'express';


 export const router =Router();


 router.get('/mensajes/:id', (req:Request, res:Response)=>{

    res.json({
        or:true,
        mensaje:req.body.cuerpo,
        de:req.body.de,
        deurl:req.params.id
    })

 })