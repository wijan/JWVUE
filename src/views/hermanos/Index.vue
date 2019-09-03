<template>
  <div class="vistaBackend">
    <h3>Hermanos</h3>
    <ul>
      <li v-for="hermano in hermanos" :key="hermano.uid">
        {{hermano.nombreCompleto}}
      </li>
    </ul>
    <div class="crear form-row">
      <div class="col-lg-3 form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" class="form-control" name="nombre" id="nombre" v-model="hermano.nombre">
      </div>
      <div class="col-lg-3 form-group">
        <label for="nombre2">Segundo nombre:</label>
        <input type="text" class="form-control" name="nombre2" id="nombre2" v-model="hermano.nombre2">
      </div>
      <div class="col-lg-3 form-group">
        <label for="apellido1">Primer apellido:</label>
        <input type="text" class="form-control" name="apellido1" id="apellido1" v-model="hermano.apellido1">
      </div>
      <div class="col-lg-3 form-group">
        <label for="apellido2">Segundo apellido:</label>
        <input type="text" class="form-control" name="apellido2" id="apellido2" v-model="hermano.apellido2">
      </div>
    </div>
    <button class="btn btn-success" @click="agregarHermano">
      <icono :icon="'save'"/> Guardar hermano
    </button>
  </div>
</template>

<script>
import {db} from '@/firebase'
var datos = db.collection('hermanos');
let hermanoVacio = {
  nombre: '',
  nombre2: '',
  apellido1: '',
  apellido2: '',  
}

var hermanos = {
  data: function(){
    return{
      hermanos:[],
      hermano: hermanoVacio
    }
  },
  methods:{
    cargarDatos: function(){
      this.hermanos = [];
      datos.get().then((peticion) =>{
        peticion.forEach((doc)=>{
          var datoCargado = doc.data();
          datoCargado["id"] = doc.id;
          this.hermanos.push(datoCargado);
        })
      })
    },
    agregarHermano(){
      var guardado = false;
      let nuevo = this.hermano;
      nuevo.nombreCompleto = 
        [nuevo.nombre, nuevo.nombre2, nuevo.apellido1, nuevo.apellido2].join(' ');
      while(nuevo.nombreCompleto.charAt(nuevo.nombreCompleto.length-1) === ' '){
        nuevo.nombreCompleto = nuevo.nombreCompleto.slice(0,-1);
      }
      datos.add(nuevo)
      .then(
        ()=>{
          this.hermano = {
            nombre: '',
            nombre2: '',
            apellido1: '',
            apellido2: '',  
          };
        }
      );
    }
  },
  mounted(){
    datos.onSnapshot(()=>{
      this.cargarDatos();
    })
  }
}
export default hermanos;
</script>

<style>

</style>