<template>
  <div class="home">
    
    <div class="col-md-4 offset-md-7">
              <div class="contenido">
                <h1 class="hero-title">
                  JW Management
                </h1>
                <p>
                  Con JW Management podrás gestionar todo lo que tenga que ver con la congregación:
                  <ul>
                    <li>
                      <icono :icon="'users'"/> Hermanos 
                    </li>
                    <li>
                      <icono :icon="'file-alt'"/> Asignaciones 
                    </li>
                    <li>
                      <icono :icon="'map-marked-alt'"/> Territorios 
                    </li>
                    <li>
                      <icono :icon="'tasks'"/> Responsabilidades 
                    </li>
                  </ul>

                </p>
                <div class="hero-btn mt-5">
                  <button class="btn btn-info custom-btn mr-4" @click="empezar">
                      <icono :icon="'sign-in-alt'"/>
                      <span class="menu-text"> Empezar</span>
                  </button>
                </div>
              </div>
            </div>
    </div>
  </div>
  
    

</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  methods:{
    empezar: function(){
      window.location.href="/admin"
    }
  }
}
</script>
<style scoped lang="scss">
  .portada{
    padding-top: 7rem;
    width: 100%;
    height: 800px;
    text-align: left;
  }

  #portada{
    background: url("~@/assets/imagenes/management1.png") no-repeat ;
    background-size: 100% auto;
  }

  a{
    color:white;
  }
</style>
