import Vue from 'vue'
import Vuex from 'vuex'
import {router} from '@/router';
import {fb} from '@/firebase'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// const vuexAlmacenaje = new VuexPersist({
//   key: process.env.VUE_APP_STORAGE_KEY,
//   storage: localForage,
// })

let usuarioNulo = {
  logeado: false,
  nombre: null,
  id: null,
  email: null
};

const store = new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    usuario: usuarioNulo,
  },
  getters:{
  },
  mutations: {
    login(state, info){
      state.usuario.email = info.email;
      state.usuario.id = info.uid;
      state.usuario.logeado = true;
    },
    logout(state){
      state.usuario = usuarioNulo;
    }
  },
  actions: {
    login({commit}, datosLogin){
      return new Promise((solucion, rechazo) => {
        fb.auth().signInWithEmailAndPassword(datosLogin.email, datosLogin.pass)
          .then(()=>{
            fb.auth().onAuthStateChanged(usuarioAutenticado =>{
              debugger;
              commit('login', usuarioAutenticado);
              solucion()
            });
          })
          .catch(error => {
            rechazo(error.message)
          });
      })
    },
    registro({commit}, usuario){
      return new Promise((solucion, rechazo) =>{
        fb.auth().createUserWithEmailAndPassword(usuario.email, usuario.pass)
          .then(()=>{
            fb.auth().onAuthStateChanged(usuarioAutenticado =>{
              commit('login', usuarioAutenticado);
              solucion();
            });
          })
          .catch(error =>{
            rechazo(error.message)
          });
      })
    },
    logout({commit}){
      fb.auth().signOut().then(()=>{
        fb.auth().onAuthStateChanged(usuarioAutenticado =>{
          commit('logout', usuarioAutenticado);
          router.push({name: 'home'});
        })
      })
    }
  }
})


export {store}