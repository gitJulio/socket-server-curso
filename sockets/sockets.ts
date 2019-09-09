import {Socket} from 'socket.io'


export const desconectar = (cliente:Socket)=>{

    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');

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
         console.log('Configurar', payload.nombre);
         callback({
           ok:false,
           mensaje:`Usuario ${payload.nombre}, configurado`
         })
         // io.emit('mensaje-nuevo', payload)
    })
}
