import {Socket} from 'socket.io'
import SocketIO from 'socket.io'
import { UsuariosLista } from '../clases/usuarios-lista';
import { Usuario } from '../clases/usuario';
import { IncomingMessage } from 'http';

export const usuariosConectados=new UsuariosLista()


export const conectarCliente =(cliente:Socket, io:SocketIO.Server)=>{
    const usuario = new Usuario(cliente.id)
    usuariosConectados.agregar(usuario)
   
}

export const desconectar = (cliente:Socket, io:SocketIO.Server)=>{

    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id)
        io.emit('usuarios-activos', usuariosConectados.getLista())

    })
}

export const mensaje =(cliente:Socket, io:SocketIO.Server)=>{
    cliente.on('mensaje',(payload:{de:string, cuerpo:string})=>{
         console.log('Mensaje recibido', payload);
         io.emit('mensaje-nuevo', payload)
    })
}

export const configurarUsuario =(cliente:Socket, io:SocketIO.Server)=>{
    cliente.on('configurar-usuario',(payload:{nombre:string}, callback:Function)=>{
         
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre)
        io.emit('usuarios-activos', usuariosConectados.getLista())
         callback({
           ok:false,
           mensaje:`Usuario ${payload.nombre}, configurado`
         })
         // io.emit('mensaje-nuevo', payload)
    })
}

export const obtenerUsuariosActivos =(cliente:Socket, io:SocketIO.Server)=>{

    cliente.on('obtener-activos',()=>{
        io.to(cliente.id).emit('usuarios-activos',usuariosConectados.getLista())
    })
}

