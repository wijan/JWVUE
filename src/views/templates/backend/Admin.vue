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
        <!-- page-content" -->
    </div>
  
</template>

<script>
import {store} from '@/store'
import {router} from '@/router';

export default {
    name: "admin",
    methods:{
        toggleMenu(){
            // eslint-disable-next-line
            $(".page-wrapper").toggleClass("toggled");
        },
        cerrarSesion(){
            store.dispatch('logout')
                .then(() => {
                    router.push({name: 'home'});
                })
            // fb.auth().signOut()
            //     .then((user) => {
            //         console.log(user);
            //         router.push({name: 'home'});
            //     })
            //     .catch(function(error){
            //         console.log(error);
            //     });
        }
    }
}
</script>

<style>

</style>