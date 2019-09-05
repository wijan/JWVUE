<template>
  <div class="vistaBackend">
    <h3>Hermanos</h3>
    <table class="table table-striped table-bordered" v-show="hermanos.length > 0">
      <thead>
        <tr>
          <th @click="ordenar('nombreCompleto')">
            Nombre Completo
            <icono class="ordenacion" :icon="'sort-up'" v-show="orden.campo === 'nombreCompleto' && orden.sentido === 'asc'"/>
            <icono class="ordenacion" :icon="'sort-down'"  v-show="orden.campo === 'nombreCompleto' && orden.sentido === 'desc'"/>
          </th>
          <th @click="ordenar('nombre')">
            Nombre
            <icono class="ordenacion" :icon="'sort-up'" v-show="orden.campo === 'nombre' && orden.sentido === 'asc'"/>
            <icono class="ordenacion" :icon="'sort-down'"  v-show="orden.campo === 'nombre' && orden.sentido === 'desc'"/>
          </th>
          <th @click="ordenar('nombre2')">
            2º nombre
            <icono class="ordenacion" :icon="'sort-up'" v-show="orden.campo === 'nombre2' && orden.sentido === 'asc'"/>
            <icono class="ordenacion" :icon="'sort-down'"  v-show="orden.campo === 'nombre2' && orden.sentido === 'desc'"/>
          </th>
          <th @click="ordenar('apellido1')">
            Apellido 1
            <icono class="ordenacion" :icon="'sort-up'" v-show="orden.campo === 'apellido1' && orden.sentido === 'asc'"/>
            <icono class="ordenacion" :icon="'sort-down'"  v-show="orden.campo === 'apellido1' && orden.sentido === 'desc'"/>
          </th>
          <th @click="ordenar('apellido2')">
            Apellido 2
            <icono class="ordenacion" :icon="'sort-up'" v-show="orden.campo === 'apellido2' && orden.sentido === 'asc'"/>
            <icono class="ordenacion" :icon="'sort-down'"  v-show="orden.campo === 'apellido2' && orden.sentido === 'desc'"/>
          </th>
          <th @click="ordenar('fechaNacimiento')">
            Fecha Nacimiento
            <icono class="ordenacion" :icon="'sort-up'" v-show="orden.campo === 'fechaNacimiento' && orden.sentido === 'asc'"/>
            <icono class="ordenacion" :icon="'sort-down'"  v-show="orden.campo === 'fechaNacimiento' && orden.sentido === 'desc'"/>
          </th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hermano in hermanosOrdenados" :key="hermano.id">
          <td>{{hermano.nombreCompleto}}</td>
          <td>{{hermano.nombre}}</td>
          <td>{{hermano.nombre2}}</td>
          <td>{{hermano.apellido1}}</td>
          <td>{{hermano.apellido2}}</td>
          <td>{{hermano.fechaNacimiento}}</td>
          <td class="text-center">
            <button class="btn btn-danger" @click="eliminar(hermano.id)">
              <icono title="Eliminar" :icon="'trash'"/>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <ul>
      <li v-for="hermano in hermanos" :key="hermano.uid">
        {{hermano.nombreCompleto}}
      </li>
    </ul> -->
    <div class="crear form-row">
      <div class="col-lg-2 form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" class="form-control" name="nombre" id="nombre" v-model="hermano.nombre">
      </div>
      <div class="col-lg-2 form-group">
        <label for="nombre2">Segundo nombre:</label>
        <input type="text" class="form-control" name="nombre2" id="nombre2" v-model="hermano.nombre2">
      </div>
      <div class="col-lg-2 form-group">
        <label for="apellido1">Primer apellido:</label>
        <input type="text" class="form-control" name="apellido1" id="apellido1" v-model="hermano.apellido1">
      </div>
      <div class="col-lg-2 form-group">
        <label for="apellido2">Segundo apellido:</label>
        <input type="text" class="form-control" name="apellido2" id="apellido2" v-model="hermano.apellido2">
      </div>
      <div class="col-lg-2 form-group">
        <label for="apellido2">Fecha de Nacimiento:</label>
        <Calendario v-model="hermano.fechaNacimiento" input-class="form-control"></Calendario>
      </div>
    </div>
    <button class="btn btn-success" @click="agregar">
      <icono :icon="'save'"/> Guardar hermano
    </button>
  </div>
</template>

<script>
import {db} from '@/firebase'
var coleccion = db.collection('hermanos');

// let opcionesFecha = {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric'
// };

export default {
  data: function(){
    return{
      hermanos:[],
      hermano: {
        nombre: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',  
        fechaNacimiento: ''
      },
      mensajeEliminar: '¿Estás seguro de querer eliminar a este hermano?',
      orden: {
        campo: 'nombreCompleto',
        sentido: 'asc'
      },
      campos:[]
    }
  },
  methods:{
    cargarDatos: function(){
      this.hermanos = [];
      this.campos = [];
      coleccion.get().then((peticion) =>{
        peticion.forEach((doc) => {
          var campos = Object.keys(doc.data());
          this.campos = this.campos.concat(campos);
        })
        this.campos = this.campos.unique();
        peticion.forEach((doc)=>{
          var datoCargado = doc.data();
          // datoCargado.nombreCompleto = datoCargado.nombreCompleto ? datoCargado.nombreCompleto : '';
          // datoCargado.nombre = datoCargado.nombre ? datoCargado.nombre : '';
          // datoCargado.nombre2 = datoCargado.nombre2 ? datoCargado.nombre2 : '';
          // datoCargado.apellido1 = datoCargado.apellido1 ? datoCargado.apellido1 : '';
          // datoCargado.apellido2 = datoCargado.apellido2 ? datoCargado.apellido2 : '';
          datoCargado.fechaNacimiento = datoCargado.fechaNacimiento ? formatearFecha(new Date(datoCargado.fechaNacimiento.seconds*1000)) : "";
          
          datoCargado["id"] = doc.id;
          this.hermanos.push(datoCargado);
        })
      })
    },
    agregar(){
      let nuevo = this.hermano;
      nuevo.nombreCompleto = 
        [nuevo.nombre, nuevo.nombre2, nuevo.apellido1, nuevo.apellido2].join(' ');
      while(nuevo.nombreCompleto.charAt(nuevo.nombreCompleto.length-1) === ' '){
        nuevo.nombreCompleto = nuevo.nombreCompleto.slice(0,-1);
      }
      nuevo.fechaNacimiento = nuevo.fechaNacimiento ? new Date(nuevo.fechaNacimiento) : '';
      coleccion.add(nuevo)
      .then(
        ()=>{
          
          this.hermano = {
            nombre: '',
            nombre2: '',
            apellido1: '',
            apellido2: '',
            fechaNacimiento: ''
          };
        }
      );
    },
    eliminar(id){
      let eliminar = confirm(this.mensajeEliminar)
      if(eliminar){
        coleccion.doc(id).delete()
        .then(() =>{
          console.log("Hermano eliminado.");
        }).catch(()=>{
          console.error("No se ha podido eliminar al hermano.");
        })
      }
    },
    ordenar(campoOrden){
      if(campoOrden === this.orden.campo){
        this.orden.sentido = this.orden.sentido === 'asc' ? 'desc' : 'asc';
      }
      else{
        this.orden.campo = campoOrden;
        this.orden.sentido = 'asc';
      }
    }
  },
  computed: {
    hermanosOrdenados:function(){
      return this.hermanos.sort((a,b)=>{
        let campoA = a[this.orden.campo], campoB = b[this.orden.campo];
        let campoAOK = campoA !== '', campoBOK = campoB !== '';
        let resultado;
        if(!campoAOK && !campoBOK) resultado = 0;
        else if(!campoAOK) resultado = -1;
        else if(!campoBOK) resultado = 1;
        else resultado = (campoA > campoB) ? 1 : -1;
        return this.orden.sentido === 'asc' ? resultado : (resultado * (-1));
      });
    }
  },
  mounted(){
    coleccion.onSnapshot(()=>{
      this.cargarDatos();
    })
  }
}

  Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

  function formatearFecha(value)
  {
    return value.getDate() + "/" + (value.getMonth()+1) + "/" + value.getFullYear();
  }
</script>

<style scoped>
  td{
    vertical-align: middle!important;
  }

  .ordenacion{
    float:right;
  }

  table th:hover{
    cursor: pointer;
  }
</style>