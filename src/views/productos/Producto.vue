<template>
    <div class="vistaBackend">
        <router-link to="/admin/productos">
            <icono :icon="'chevron-left'"/> Ir a Productos    
        </router-link>
        <h3>{{nombre}}</h3>
    </div>
</template>

<script>
export default {
    name:'Producto',
    props:{
        nombre: String
    }
}
</script>

<style>

</style>