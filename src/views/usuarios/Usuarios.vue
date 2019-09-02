<template>
    <div class="vistaBackend">
        <h3>
            <icono :icon="'users'"/> Usuarios
        </h3>
        <div id="lista-usuarios" class="col-md-12">
            <div class="usuario" v-for="usuario in usuarios" :key="usuario.id">
                <router-link :to="'/admin/usuarios/' + usuario.id">
                    <img :src="usuario.avatar" class="rounded-circle"/>
                    <span class="nombre-usuario"> 
                        {{usuario.first_name}} {{usuario.last_name}}
                    </span>
                </router-link>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    data: function(){
        return{
            usuarios: []
        }
    },
    methods:{
        fetchData: function(){
            let vue = this;
            var usuarios = [];
            for(let i = 1; i < 10; i++){
                let url = 'https://reqres.in/api/users?page=' + i;
                fetch(url)
                    .then(function(respuesta){
                        return respuesta.json()
                    })
                    .then(function(json){
                        console.log(json);
                        vue.usuarios = vue.usuarios.concat(json.data);
                    });
            }
            
        }
    },
    mounted(){
        this.fetchData();
    }
}
</script>

<style>

</style>