<template>

    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <a id="show-sidebar" @click="toggleMenu" class="btn btn-sm btn-dark" href="#">
            <icono :icon="'bars'"/>
        </a>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">JW Management</a>
                    <div id="close-sidebar" @click="toggleMenu">
                        <icono :icon="'times'"/>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                    <div class="user-pic">
                        <img class="img-responsive img-rounded" src="@/assets/imagenes/user.png" alt="User picture">
                    </div>
                    <div class="user-info">
                        <span class="user-name">
                            <strong>Wijan Ruiz Mok</strong>
                        </span>
                        <span class="user-role">
                            Administrator
                        </span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-item sidebar-search">
                    <div>
                        <div class="input-group">
                            <input type="text" class="form-control search-menu" placeholder="Search...">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>General</span>
                        </li>
                        <li class="sidebar-dropdown">
                            <router-link to="/admin">
                                <i class="fa fa-tachometer-alt"></i>
                                <span class="menu-text">Dashboard</span>
                                <span class="badge badge-pill badge-warning">New</span>
                            </router-link>
                        </li>
                        <li class="siderbar-dropdown">
                            <router-link to="/admin/hermanos">
                                <i class="fa fa-user-tie"></i>
                                <span class="menu-text">Hermanos</span>
                            </router-link>
                        </li>
                        <li class="siderbar-dropdown">
                            <router-link to="/admin/usuarios">
                                <i class="fa fa-users"></i>
                                <span class="menu-text">Usuarios</span>
                            </router-link>
                        </li>
                        <li class="siderbar-dropdown">
                            <a href="" @click="cerrarSesion">
                                <i class="fa fa-power-off"></i>
                                <span class="menu-text">Cerrar Sesión</span>
                            </a>
                        </li>

                        <!-- <li class="header-menu">
                            <span>Extra</span>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-book"></i>
                                <span class="menu-text">Documentation</span>
                                <span class="badge badge-pill badge-primary">Beta</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-calendar"></i>
                                <span class="menu-text">Calendar</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-folder"></i>
                                <span class="menu-text">Examples</span>
                            </a>
                        </li> -->
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
        </nav>
        <!-- page-content  -->
        <main class="page-content pt-2">
            <div class="container">
                <router-view/>
            </div>
        </main>
        <div id="chats">
            <div class="chat new" @click.stop="mostrarNuevoChat" :class="{'activo': nuevoChat.activo}">
                <div class="chat-title">
                    <icono :icon="'plus'" v-show="!nuevoChat.activo"/> Nuevo chat
                    <div class="chat-minmax" @click.stop="ocultarNuevoChat" v-show="nuevoChat.activo"><icono :icon="'minus'"/></div>
                </div>
                <div class="chat-content" v-show="nuevoChat.activo">

                </div>
            </div>
            <div class="chat" v-show="!chat.cerrado" v-for="chat in chats.slice().reverse()" :key="chat.idChat" :class="{'activo': chat.activo }" @click="mostrarChat(chat.idChat)">
                <div class="chat-title" :class="{'nuevoMensaje': chat.nuevoMensaje}">
                    {{chat.nombreUsuario}}
                    <div class="chat-icon" :class="{'usuario-activo': chat.usuarioActivo, 'usuario-inactivo': !chat.usuarioActivo}"></div>
                    <div class="chat-minmax chat-close" @click.stop="cerrarChat(chat.idChat)"><icono :icon="'times'"/></div>
                    <div class="chat-minmax" @click.stop="ocultarChat(chat.idChat)" v-show="chat.activo"><icono :icon="'minus'"/></div>
                    <div class="chat-minmax" @click.stop="mostrarChat(chat.idChat)" v-show="!chat.activo"><icono :icon="'plus'"/></div>
                </div>
                <div class="chat-content" v-show="chat.activo">
                    <div class="message" v-for="mensaje in chat.mensajes" :key="mensaje.id" :class="{'sended': mensaje.idUsuario === idUsuario, 'received': mensaje.idUsuario !== idUsuario}">
                        <p>
                            {{mensaje.contenido}}
                        </p>
                        <div class="momento">
                            {{mensaje.momento}}
                        </div>
                    </div>
                </div>
                <div class="new-message" v-show="chat.activo">
                    <textarea rows="1" id="newMessageInput" class="chat-message-zone" placeholder="Escriba..." v-model="chat.mensajeChat" ></textarea>
                    <button class="chat-send">
                        <icono :icon="'paper-plane'"/> Enviar
                    </button>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script>
import {store} from '@/store'
import {router} from '@/router';
import io from 'socket.io-client';
import autosize from 'autosize';

export default {
    name: "admin",
    data: function(){
        return{
            socket: io('localhost:3001'),
            idUsuario: this.$store.state.usuario.id,
            nuevoChat:{
                activo: false
            },
            chats:[
                {
                    activo: false,
                    mensajeChat: '',
                    usuarioActivo: false,
                    nombreUsuario: 'Jaime Calzas',
                    idChat: 1,
                    cerrado: false,
                    nuevoMensaje: true,
                    mensajes:[
                        {
                            id: 1,
                            idUsuario: "XySg9ypAIlZyaiX8FCSjRaRStMo2",
                            momento: '09/09/19 15:41',
                            contenido: 'Buenas Jaime, ¿cómo estás?'
                        },
                        {
                            id: 2,
                            idUsuario: "tururu",
                            momento: '09/09/19 15:44',
                            contenido: 'Bien, trabajando!'
                        },
                        {
                            id: 3,
                            idUsuario: "tururu",
                            momento: '09/09/19 15:44',
                            contenido: 'Algo liado, pero dime'
                        },
                        {
                            id: 4,
                            idUsuario: "XySg9ypAIlZyaiX8FCSjRaRStMo2",
                            momento: '09/09/19 15:46',
                            contenido: 'Vaya, jo, era por si querías ir a hacer padel después.'
                        },
                    ]
                },
                {
                    activo: false,
                    mensajeChat: '',
                    usuarioActivo: true,
                    nombreUsuario: 'Silvio Jérez',
                    idChat: 2,
                    cerrado: false,
                    nuevoMensaje: false,
                    mensajes:[
                        {
                            id: 5,
                            idUsuario: "XySg9ypAIlZyaiX8FCSjRaRStMo2",
                            momento: '10/09/19 13:20',
                            contenido: 'Silvio, ya tengo los precios de los hoteles'
                        },
                        {
                            id: 6,
                            idUsuario: "tarara",
                            momento: '10/09/19 13:22',
                            contenido: 'Perfecto! Enviamelos cuándo puedas por favor'
                        },
                        {
                            id: 7,
                            idUsuario: "XySg9ypAIlZyaiX8FCSjRaRStMo2",
                            momento: '10/09/19 13:23',
                            contenido: 'Ok, te los envío ahora.'
                        },
                        {
                            id: 8,
                            idUsuario: "tarara",
                            momento: '10/09/19 13:23',
                            contenido: 'Muy bien, gracias.'
                        },
                        {
                            id: 9,
                            idUsuario: "XySg9ypAIlZyaiX8FCSjRaRStMo2",
                            momento: '10/09/19 13:24',
                            contenido: '¿Los comentemos el viernes?'
                        },
                        {
                            id: 14,
                            idUsuario: "tarara",
                            momento: '10/09/19 13:25',
                            contenido: 'No, mejor el sábado.'
                        },
                        {
                            id: 15,
                            idUsuario: "XySg9ypAIlZyaiX8FCSjRaRStMo2",
                            momento: '10/09/19 13:26',
                            contenido: 'Vaya, es que el sábado he quedado con Roberto para explicarle cómo funciona la aplicación.'
                        },
                        {
                            id: 16,
                            idUsuario: "tarara",
                            momento: '10/09/19 13:26',
                            contenido: 'Pues el domingo, después de la reunión.'
                        },
                        {
                            id: 17,
                            idUsuario: "XySg9ypAIlZyaiX8FCSjRaRStMo2",
                            momento: '10/09/19 13:27',
                            contenido: 'Vale, el domingo sí puedo.'
                        },
                    ]
                },
                {
                    activo: false,
                    mensajeChat: '',
                    usuarioActivo: true,
                    nombreUsuario: 'Roberto Pacheco',
                    idChat: 3,
                    cerrado: false,
                    nuevoMensaje: false,
                    mensajes:[
                        {
                            id: 10,
                            idUsuario: "trucutru",
                            momento: '10/09/19 10:20',
                            contenido: 'Bones señor, está muy chula la aplicación.'
                        },
                        {
                            id: 11,
                            idUsuario: "trucutru",
                            momento: '10/09/19 10:20',
                            contenido: 'A ver si un día podemos quedar para que me expliques en más detalle cómo funciona.'
                        },
                        {
                            id: 12,
                            idUsuario: "XySg9ypAIlZyaiX8FCSjRaRStMo2",
                            momento: '10/09/19 10:23',
                            contenido: 'Sí claro, te va bien el sábado?.'
                        },
                        {
                            id: 13,
                            idUsuario: "trucutru",
                            momento: '10/09/19 10:30',
                            contenido: 'Sí, nos vemos el sábado entonces.'
                        }
                    ]
                }
            ],
            // chat: false,
            
            // usuarioActivo: false
        }
    },
    sockets: {
        connect() {
            // Fired when the socket connects.
            console.log('Conectado al socket.')
            this.isConnected = true;
        },
        disconnect() {
            this.isConnected = false;
        }
    },
    computed:{
        activo: function(){
            return this.mensajeChat !== '' ? 'activo' : '';
        }
    },
    methods:{
        toggleMenu(){
            // eslint-disable-next-line
            $(".page-wrapper").toggleClass("toggled");
        },
        mostrarChat(idChat){
            let chat = this.chats.find(c => c.idChat === idChat);
            chat.activo = true;
            chat.nuevoMensaje = false;
        },
        ocultarChat(idChat){
            this.chats.find(c => c.idChat === idChat).activo = false;
        },
        cerrarChat(idChat){
            this.chats.find(c => c.idChat === idChat).cerrado = true;
        },
        mostrarNuevoChat(){
            this.nuevoChat.activo = true;
        },
        ocultarNuevoChat(){
            this.nuevoChat.activo = false;
        },
        cerrarSesion(){
            store.dispatch('logout')
                .then(() => {
                    router.push({name: 'home'});
                })
        },
        mensaje(){
            console.log('enviando mensaje');
            var comunicacion = {
                id: this.socket.id,
                mensaje: 'Mensaje enviado'
            };
            this.socket.emit('ENVIAR_MENSAJE', comunicacion)
        }
    },
    mounted(){
        var nuevoMensaje = document.getElementById('newMessageInput');
        autosize(nuevoMensaje);
        this.socket.on('MENSAJE_ENTRANTE', (data) => {
            if(data.id !== this.socket.id){
                console.log(data.mensaje);
            }
            else{
                console.log('Enviaste el mensaje al resto de usuarios.');
            }
        });
    }
}
</script>

<style scoped>
    #chats{
        position: absolute;
        bottom:0%;
        right:0%;
    }

    .chat{
        width: 15rem;
        border-left: 1.5px solid black;
        border-top: 1.5px solid black;
        background-color: white;
        display: inline-grid;
        vertical-align: bottom;
        cursor: pointer;
        bottom: 0;
        border-right: 1.5px solid black;
    }

    .chat.new{
        width: 10rem;
    }

    .chat.new.activo{
        width: 25rem;
    }

    

    .chat.activo{
        width:25rem;
        cursor: default;
    }

    .chat .chat-title{
        min-height: 2rem;
        padding-left: 1rem;
        padding-top: 0.4rem;
        border-bottom: 0.1rem solid black;
        background-color: #1149A7;
        color: white;
    }

    .chat .chat-title .chat-icon{
        width:0.8rem;
        height:0.8rem;
        border-radius: 50%;
        border: 0.1rem solid white;
        display: inline-block;
    }

    .chat .chat-title .chat-icon.usuario-activo{
        background-color: green;
    }
    
    .chat .chat-title .chat-icon.usuario-inactivo{
        background-color: grey;
    }

    .chat .chat-title .chat-minmax{
        color: white;
        display: flex;
        float: right;
        margin-right:1rem;
        cursor: pointer;
    }

    .chat .chat-title .chat-close:hover{
        color: red;
    }

    .chat .chat-content{
        min-height: 3em;
        padding: 1em;
        overflow-y: auto;
        max-height: 25rem;
    }

    .chat .chat-content .message{
        width: 80%;
        padding: 0.5rem;
        display: flex;
        flex-flow: wrap;
        margin-bottom: 0.5rem;
    }

    .chat .chat-content .message p{
        margin: 0;
        width: 100%;
    }

    .chat .chat-content .message .momento{
        display:flex;
        flex-flow: wrap;
        text-align: right;
        float:right;
        font-size: 0.7rem;
        color: grey;
    }

    .chat .chat-content .sended{
        text-align: left;
        background-color: #4fa8f15c;
        border: 0.1rem solid gainsboro;
        border-radius: 0rem 0.7rem 0.7rem 0.7rem;
    }

    .chat .chat-content .received{
        border: 0.1rem solid gainsboro;
        border-radius: 0.7rem 0 0.7rem 0.7rem;
        float:right;
    }

    .chat .new-message{
        border-top: 0.1rem solid black;
        padding: 1rem 0.5rem 1rem 0.5rem;
    }

    .chat .chat-message-zone{
        width:75%;
        background-color: transparent;
        resize: none;
        outline: none;
        margin-right:0.5rem;
        max-height:10rem;
    }

    .chat .chat-send{
        padding: 0.1rem 0.3rem;
        vertical-align: top;
        color: white;
        background-color: #1149A7;
        cursor: pointer;
        border-radius: 0.5rem;
    }

    .nuevoMensaje{
        animation-name: parpadeo;
        animation-duration: 2s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;

        -webkit-animation-name:parpadeo;
        -webkit-animation-duration: 2s;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: infinite;
    }
    
    @-moz-keyframes parpadeo{  
        0% { 
            background-color: #007bff; 
        }
        50% {
            background-color: #1149A7; 
        }
        100%{
            background-color: #007bff; 
        }
    }

    @-webkit-keyframes parpadeo {  
        0% { 
            background-color: #007bff; 
        }
        50% {
            background-color: #1149A7; 
        }
        100%{
            background-color: #007bff; 
        }
    }

    @keyframes parpadeo {  
        0% { 
            background-color: #007bff; 
        }
        50% {
            background-color: #1149A7; 
        }
        100%{
            background-color: #007bff; 
        }
    }
    

    

</style>