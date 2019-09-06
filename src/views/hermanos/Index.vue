<template>
  <div class="vistaBackend">
    <h3>Hermanos</h3>
    <table class="table table-striped table-bordered" v-show="hermanosOrdenados.length > 0">
      <thead>
        <tr>
          <th v-for="campo in campos" :key="campo.orden" @click="campo.ordenable ? ordenar(campo.clave) : ''">
            {{campo.titulo}}
            <icono class="ordenacion" :icon="'sort-up'" v-show="campo.ordenable && orden.campo === campo.clave && orden.sentido === 'asc'"/>
            <icono class="ordenacion" :icon="'sort-down'" v-show="campo.ordenable && orden.campo === campo.clave && orden.sentido === 'desc'"/>
          </th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hermano in hermanosOrdenados" :key="hermano.id">
          <td v-for="campo in campos" :key="campo.orden">{{hermano[campo.clave]}}</td>
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
      <div class="col-lg-2 form-group"  v-for="campo in camposCrear" :key="campo.orden">
        <label :for="campo.clave">{{campo.titulo}}</label>
        <input class="form-control" type="text" :name="campo.clave" :id="campo.clave" v-model="hermano[campo.clave]" v-if="campo.tipo === 'string'">
        <Calendario v-model="hermano[campo.clave]" input-class="form-control" v-if="campo.tipo === 'fecha'"></Calendario>
      </div>
    </div>
    <button class="btn btn-success" @click="agregar">
      <icono :icon="'save'"/> Guardar hermano
    </button>
    <button class="btn btn-success" @click="mensaje">
      <icono :icon="'envelope'"/> Test mensaje
    </button>
  </div>
</template>

<script>
import {db} from '@/firebase'
import io from 'socket.io-client'

var datos = 'hermanos';
var coleccion = db.collection(datos);
var camposDB = db.collection('campos');

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
      campos:[],
      socket: io('localhost:3001')
    }
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    }
  },
  methods:{
    cargarCampos: function(){
      camposDB.where('coleccion', '==', datos).get().then(peticion => {
        peticion.forEach(doc => {
          let datosCampos = doc.data();
          this.campos = datosCampos.datos.sort((a,b) => {
            return a.orden > b.orden ? 1 : -1;
          });
        })
      });
    },
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
          datoCargado.nombreCompleto = datoCargado.nombreCompleto ? datoCargado.nombreCompleto : '';
          datoCargado.nombre = datoCargado.nombre ? datoCargado.nombre : '';
          datoCargado.nombre2 = datoCargado.nombre2 ? datoCargado.nombre2 : '';
          datoCargado.apellido1 = datoCargado.apellido1 ? datoCargado.apellido1 : '';
          datoCargado.apellido2 = datoCargado.apellido2 ? datoCargado.apellido2 : '';
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
    },
    camposCrear: function(){
      return this.campos.filter(c => c.crear);
    }
  },
  mounted(){
    this.socket.on('MENSAJE_ENTRANTE', (data) => {
      if(data.id !== this.socket.id){
        console.log(data.mensaje);
      }
      else{
        console.log('Enviaste el mensaje al resto de usuarios.');
      }
    });
    coleccion.onSnapshot(()=>{
      this.cargarCampos();
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