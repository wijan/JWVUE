<template>
  <Modal :id='id'>
      <template #titulo>
        Inicio de sesión
      </template>
      <template #contenido>
          <div class="row">
            <div class="col">
              <label for="email">Email</label>
              <input type="email" class="form-control" placeholder="Introduce tu correo electrónico..." v-model="email">
            </div>
            <div class="col">
              <label for="pass">Contraseña:</label>
              <input type="password" class="form-control" placeholder="Introduce tu contraseña..." v-model="pass" @keyup.enter="logear">
            </div>
          </div>
      </template>
      <template #pie>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" @click="logear">Iniciar sesión</button>
      </template>
  </Modal>
</template>

<script>
import {store} from '@/store';
import {router} from '@/router';
export default {
    data: function(){
        return{
            email: '',
            pass: '',
            id: 'Login'
        }
    },
    methods:{
        logear: function () {
            var email = this.email;
            var pass = this.pass;
            store.dispatch('login',{
                email: email,
                pass: pass
            }).then(() => { 
                // eslint-disable-next-line
                $('#Login').modal('hide');
                router.push({name: 'Dashboard'})
            });
            // fb.auth().signInWithEmailAndPassword(email, pass)
            //     .then(()=>{
            //         // eslint-disable-next-line
            //         $('#Login').modal('hide');
            //         router.push('/admin')
            //     })
            //     .catch(function(error){
            //         var codigoError = error.code;
            //         var mensajeError = error.message;
            //         if(codigoError === 'auth/wrong-password'){
            //             alert('Contraseña incorrecta');
            //         }
            //         else{
            //             alert(mensajeError);
            //         }
            //         console.log(error);
            //     })
        }
    }
}
</script>

<style>

</style>