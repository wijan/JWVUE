<template>
  <Modal :id="id">
      <template #titulo>
        Registro de Cuenta
      </template>
      <template #contenido>
          <div class="row">
              <div class="col">
              <label for="username">Nombre de Usuario:</label>
              <input type="text" name="username" id="username" class="form-control" placeholder="Introduce tu correo electrónico..." v-model="username">
              <div class="errores text-danger" @if="errores.username.estado" id="error-username">
                  {{errores.username.mensaje}}
              </div>
            </div>
            <div class="col">
              <label for="email">Email</label>
              <input type="email" name="email" id="email" class="form-control" placeholder="Introduce tu correo electrónico..." v-model="email">
              <div class="errores text-danger" @if="errores.email.estado" id="error-email">
                  {{errores.email.mensaje}}
              </div>
            </div>
            
          </div>
          <div class="row mt-3">
              <div class="col">
                  <label for="pass">Contraseña:</label>
                  <input type="password" name="pass" id="pass" class="form-control" placeholder="Introduce tu contraseña..." v-model="pass">
                  <div class="errores text-danger" @if="errores.pass.estado" id="error-pass">
                  {{errores.pass.mensaje}}
              </div>
              </div>
              <div class="form-group col-md-6">
              <label for="pass">Confirmación de contraseña:</label>
              <input type="password" name="pass2" id="pass2" class="form-control" placeholder="Introduce tu contraseña..." v-model="pass2">
              <div class="errores text-danger" @if="errores.pass.estado" id="error-pass">
                  {{errores.pass.mensaje}}
              </div>
            </div>
          </div>
      </template>
      <template #pie>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" @click="registro">Registrar</button>
      </template>
  </Modal>
</template>

<script>
// import {fb} from '@/firebase'
import {router} from '@/router';
import {store} from '@/store'
export default {
    data: function(){
        return{
            username: '',
            email: '',
            pass: '',
            pass2: '',
            id: 'Registro',
            errores:{
                pass:{
                    estado: false,
                    mensaje: ''
                },
                email:{
                    estado: false,
                    mensaje: ''
                },
                username:{
                    estado: false,
                    mensaje: ''
                }
            },        
        }
    },
    computed:{
    },
    methods:{
        registro: function () {
            if(this.pass !== this.pass2){
                this.errores.pass.estado = true;
                this.errores.pass.mensaje = 'Las contraseñas no coinciden';
            }
            
            var hayErrores = Object.entries(this.errores).filter(err => err.estado).length > 0;

            if(!hayErrores){
                store.dispatch('registro',{
                    email: this.email,
                    pass: this.pass
                }).then(()=>{router.push('/dashboard') })
            }
            // this.errorPass = this.pass !== this.pass2 ? 'Las contraseñas no coinciden.' : '';
            // fb.auth().createUserWithEmailAndPassword(this.email, this.pass)
            //     .then((user) => {
            //         console.log(user.uid)
            //         router.push({name: 'dashboard'})
            //     })
            //     .catch(function(error){
            //         var codigoError = error.code;
            //         var mensajeError = error.Mensaje;
            //         if(codigoError == 'auth/weak-password'){
            //             this.errorPass = 'La contraseña es demasiado débil';
            //         }
            //         else{
            //             alert(mensajeError);
            //         }
            //         console.log(error)
            //     });
        }
    }
}
</script>

<style>

</style>