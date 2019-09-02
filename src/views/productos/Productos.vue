<template>
  <div class="vistaBackend">
      <h3>
          Productos
      </h3>
      <ul id="lista-productos">
          <li v-for="producto in productos" :key="producto.id">
              <router-link :to="'/admin/productos/' + producto.nombre">
                  {{producto.nombre}}
              </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
let productos =[
    {
        "id":1,
        "nombre": "Patatas"
    },
    {
        "id":2,
        "nombre": "Olivas"
    },
    {
        "id":3,
        "nombre": "Coca-Cola"
    },
    {
        "id":4,
        "nombre": "Pan"
    },
    {
        "id":5,
        "nombre": "Jabón"
    }
];
export default {
    data(){
        return{
            productos
        }
    },
    // computed:{
    //     productosV: function(){
    //         return this.productos.map(function(producto){
    //             return {
    //                 nombre: producto.nombre,
    //                 id: producto.id,
    //                 link: 'admin/productos/' + producto.nombre
    //             }
    //         })
    //     }
    // }
}
</script>

<style>

</style>