const express = require('express');


const app = express();



const server = app.listen(3001, function() {
    console.log('server running on port 3001');
});


const io = require('socket.io')(server);

var conexiones = [];

io.on('connection', function(socket) {
    console.log('Nueva conexión: ' + socket.id);
    conexiones.push(socket);
    listarConexiones();
    socket.on('ENVIAR_MENSAJE', function(data) {
        data.mensaje = data.mensaje + ' correctamente.';
        io.emit('MENSAJE_ENTRANTE', data)
    });

    socket.on('disconnect',()=>{
        console.log('Desconexion de: ' + socket.id)
        var nConexion = conexiones.indexOf(socket);
        conexiones.splice(nConexion, 1);
        listarConexiones();
    })
});

function listarConexiones(){
    console.log('Lista de conexiones:')
    var listaConexiones = conexiones.map(c => {return c.id});
    listaConexiones.forEach(conexion=>{
        console.log('Conexion ' + (listaConexiones.indexOf(conexion) + 1) +' => ' + conexion);
    })
    console.log('--------------------------------------------------------------')
}