import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io'
import http from 'http'
import * as socket from '../sockets/sockets';

export default class Server{

    public app:express.Application;
    public port:number;
    public io:socketIO.Server;
    private httpServer: http.Server;
    private static _instance:Server;

    private constructor(){
        this.app=express();
        this.port=SERVER_PORT;
        this.httpServer=new http.Server(this.app);
        this.io=socketIO(this.httpServer);
        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || (this._instance =new this());
    }

    private escucharSockets(){
        console.log("Escuchando conexiones - Sockets");


        this.io.on('connection', cliente=>{
            console.log('Cliente Conectado '+'id :'+cliente.id);

            // Conectar cliente
            socket.conectarCliente(cliente, this.io)

            // Configurar Usuario
            socket.configurarUsuario(cliente, this.io)

            // Desconectar
            socket.desconectar(cliente, this.io);

            // Mensajes
            socket.mensaje(cliente, this.io)

            //Obtener usuarios Activos
            socket.obtenerUsuariosActivos(cliente, this.io);
          
        })

    }

    start(callback:any){
         this.httpServer.listen(this.port, callback)
    }

}
