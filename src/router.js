import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/landing/Home.vue'
import Admin from './views/templates/backend/Admin.vue'
import Dashboard from './views/templates/backend/Dashboard.vue'
import Usuarios from './views/usuarios/Index.vue'
import Usuario from './views/usuarios/Detalle.vue'
import Hermanos from './views/hermanos/Index.vue'
import Acerca from './views/landing/Acerca.vue'
import Portada from './views/templates/frontend/Portada.vue'
import {store} from './store'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Portada,
      children:[
        {
          path: "",
          component: Home,
          name: "home"
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: Acerca
        }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      meta: {
        requiereAuth: true
      },
      children:[
        {
          path: "",
          name: "Dashboard",
          component: Dashboard
        },
        {
          path: "usuarios",
          name: "usuarios",
          component: Usuarios
        },
        {
          path: "usuarios/:id",
          name: "usuario",
          component: Usuario,
          props: true
        },
        {
          path: "hermanos",
          name: "Hermanos",
          component: Hermanos
        }
      ]
    }
  ]
});

router.beforeEach((hacia, desde, siguiente) =>{
  if(hacia.matched.some(ruta => ruta.meta.requiereAuth)){
    let logeado = store.state.usuario.logeado;

    if(!logeado){
      siguiente('/')
    }
    else{
      siguiente();
    }
  }
  siguiente();
  // const requiereAuth = hacia.matched.some(x => x.meta.requiereAuth);
  // debugger;
  // const usuarioActual = fb.auth().currentUser;

  // if(requiereAuth && !usuarioActual){
  //   siguiente('/')
  // }
  // else if(requiereAuth && usuarioActual){
  //   siguiente()
  // }
  // else{
  //   siguiente()
  // }
})

export {router}
