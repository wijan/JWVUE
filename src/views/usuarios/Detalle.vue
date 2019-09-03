<template>
    <div class="vistaBackend">
        <router-link to="/admin/usuarios">
            <icono :icon="'chevron-left'"/> Ir a Usuarios    
        </router-link>
        <div class="row">
            <div class="col-md-12">
            <h3>
                <icono :icon="'user'"/> {{usuario.first_name}} {{usuario.last_name}}
            </h3>
            </div>
            
            <div class="clearfix"></div>
            <div class="col-md-3">
                <img :src="usuario.avatar" class="img-responsive">
            </div>
            <div class="col-md-9">
                <ul>
                    <li>
                        <b>Nombre</b>: {{usuario.first_name}} {{usuario.last_name}}
                    </li>
                    <li>
                        <b>E-Mail</b>: {{usuario.email}}
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'Usuario',
    props:["id"],
    data: function(){
        return{
            usuario:{}
        }
    },
    methods:{
        fetchData: function(){
            let vue = this;
            let url = 'https://reqres.in/api/users/' + this.id;
            fetch(url)
                .then(function(respuesta){
                        return respuesta.json()
                    })
                .then(function(json){
                    console.log(json);
                    vue.usuario = json.data;
                });
        }
    },
    mounted(){
        this.fetchData();
    }
}
</script>

<style>

</style>