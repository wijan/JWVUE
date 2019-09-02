<template>
  <div class="home">
    <navbar></navbar>
    <div class="portada">
    <div class="container h-100" id="portada">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-md-4 offset-md-7">
              <div class="contenido">
                <h1 class="hero-title">
                  JW Management
                </h1>
                <p>
                  Con JW Management podrás gestionar todo lo que tenga que ver con la congregación:
                  <ul>
                    <li>
                      Hermanos
                    </li>
                    <li>
                      Asignaciones
                    </li>
                    <li>
                      Territorios
                    </li>
                    <li>
                      Responsabilidades
                    </li>
                  </ul>
                  
                </p>
                <div class="hero-btn mt-5">
                  <button class="btn btn-info custom-btn mr-4">
                    <router-link to="/admin">
                      <i class="fa fa-tachometer-alt"></i>
                      <span class="menu-text">Empezar</span>
                    </router-link>
                  </button>
                    
                    <button class="btn custom-btn btn-outline-secondary">Products</button>
                </div>
              </div>
            </div>
            <div class="col-md-7">
                <div class="graphic">
                </div>
            </div>
          </div>
        </div>
  </div>
    </div>
    

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
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

  .contenido{
    margin-top:5em;
  }
</style>
