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
            <!---->
            <div class="chat" v-show="!chat.cerrado" v-for="chat in chats.slice().reverse()" :key="chat.idChat" :class="{'activo': chat.activo }" @click="mostrarChat(chat.idChat)">
                <div class="chat-title" :class="{'nuevoMensaje': chat.nuevoMensaje}">
                    {{chat.nombreUsuario}}
                    <div class="chat-icon" :class="{'usuario-activo': chat.usuarioActivo, 'usuario-inactivo': !chat.usuarioActivo}"></div>
                    <div class="chat-minmax chat-close" @click.stop="cerrarChat(chat.idChat)"><icono :icon="'times'"/></div>
                    <div class="chat-minmax" @click.stop="ocultarChat(chat.idChat)" v-show="chat.activo"><icono :icon="'minus'"/></div>
                    <div class="chat-minmax" @click.stop="mostrarChat(chat.idChat)" v-show="!chat.activo"><icono :icon="'plus'"/></div>
                </div>
                <div class="chat-content" v-show="chat.activo">
                    <div class="sended message">
                        <p>
                            Buenas Jaime, como estas?
                        </p>
                        <div class="momento">
                            09/09/19 15:41
                        </div>
                    </div>
                    <div class="received message">
                        <p>
                            Bien, trabajando!
                        </p>
                        <div class="momento">
                            09/09/19 15:44
                        </div>
                    </div>
                    <div class="received message">
                        <p>
                            Algo liado, pero dime
                        </p>
                        <br>
                        <div class="momento">
                            09/09/19 15:44
                        </div>
                    </div>
                    <div class="sended message">
                        <p>Vaya, jo, era por si querías ir a hacer padel despues.</p>
                        <div class="momento">
                            09/09/19 15:46
                        </div>
                    </div>
                </div>
                <div class="new-message" v-show="chat.activo">
                    <textarea rows="1" id="newMessageInput" class="chat-message-zone" placeholder="Escriba..." v-model="mensajeChat" ></textarea>
                    <button class="chat-send">
                        <icono :icon="'paper-plane'"/> Enviar
                    </button>
                </div>
                
            </div>
            <!-- <div class="chat" :class="{'activo': chat }" @click="mostrarChat">
                <div class="chat-title">
                    Jaime Calzas
                    <div class="chat-icon" :class="{'usuario-activo': usuarioActivo, 'usuario-inactivo': !usuarioActivo }"></div>
                    <div class="chat-minmax" @click.stop="ocultarChat" v-show="chat"><icono :icon="'minus'"/></div>
                    <div class="chat-minmax" @click.stop="mostrarChat" v-show="!chat"><icono :icon="'plus'"/></div>
                </div>
                <div class="chat-content" v-show="chat">
                    <div class="sended message">
                        <p>
                            Buenas Jaime, como estas?
                        </p>
                        <div class="momento">
                            09/09/19 15:41
                        </div>
                    </div>
                    <div class="received message">
                        <p>
                            Bien, trabajando!
                        </p>
                        <div class="momento">
                            09/09/19 15:44
                        </div>
                    </div>
                    <div class="received message">
                        <p>
                            Algo liado, pero dime
                        </p>
                        <br>
                        <div class="momento">
                            09/09/19 15:44
                        </div>
                    </div>
                    <div class="sended message">
                        <p>Vaya, jo, era por si querías ir a hacer padel despues.</p>
                        <div class="momento">
                            09/09/19 15:46
                        </div>
                    </div>
                </div>
                <div class="new-message" v-show="chat">
                    <textarea rows="1" id="newMessageInput" class="chat-message-zone" :class="activo" placeholder="Escriba..." v-model="mensajeChat" ></textarea>
                    <button class="chat-send">
                        <icono :icon="'paper-plane'"/> Enviar
                    </button>
                </div>
                
            </div> -->
        </div>
        <!-- page-content" -->
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
            chats:[
                {
                    activo: false,
                    mensajeChat: '',
                    usuarioActivo: false,
                    nombreUsuario: 'Jaime Calzas',
                    idChat: 1,
                    cerrado: false,
                    nuevoMensaje: true
                },
                {
                    activo: false,
                    mensajeChat: '',
                    usuarioActivo: true,
                    nombreUsuario: 'Silvio Jérez',
                    idChat: 2,
                    cerrado: false,
                    nuevoMensaje: false
                },
                {
                    activo: false,
                    mensajeChat: '',
                    usuarioActivo: true,
                    nombreUsuario: 'Roberto Pacheco',
                    idChat: 3,
                    cerrado: false,
                    nuevoMensaje: false
                }
            ],
            // chat: false,
            mensajeChat: '',
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
        border-radius: 0.5rem;
    }

    .chat .chat-content .received{
        border: 0.1rem solid gainsboro;
        border-radius: 0.5rem;
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