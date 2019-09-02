import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/landing/Home.vue'
import Tururu from './views/tests/Tururu.vue'
import Admin from './views/templates/backend/Admin.vue'
import Dashboard from './views/templates/backend/Dashboard.vue'
import Productos from './views/productos/Productos.vue'
import Producto from './views/productos/Producto.vue'
import Usuarios from './views/usuarios/Usuarios.vue'
import Usuario from './views/usuarios/Usuario.vue'
import Acerca from './views/landing/Acerca.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Acerca
    },
    {
      path: '/tururu/:id',
      name: 'tururu',
      component: Tururu,
      props:true
    },
    {
      path: '/admin',
      component: Admin,
      children:[
        {
          path: "",
          name: "Dashboard",
          component: Dashboard
        },
        {
          path:"productos",
          name:"productos",
          component:Productos,
        },
        {
          path:"productos/:nombre",
          name:"producto",
          component:Producto,
          props: true
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
        }
      ]
    }
  ]
})
