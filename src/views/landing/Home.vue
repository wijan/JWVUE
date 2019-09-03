<template>
  <div id="home" class="col-md-12">
    <div class="col-md-4 offset-md-7">
      <h1 class="titulo-home">JW Management</h1>
      <p>Con JW Management podrás gestionar todo lo que tenga que ver con la congregación:</p>
      <ul>
        <li>Hermanos</li>
        <li>Asignaciones</li>
        <li>Territorios</li>
        <li>Responsabilidades</li>
      </ul>
      <div class="hero-btn mt-5">
        <button class="btn btn-info custom-btn mr-4" data-toggle="modal" data-target="#Login" >
          <icono :icon="'sign-in-alt'" />
          <span class="menu-text">Iniciar sesión</span>
        </button>
        <button class="btn btn-info custom-btn mr-4" data-toggle="modal" data-target="#Registro" >
          <icono :icon="'sign-in-alt'" />
          <span class="menu-text">Empezar</span>
        </button>
      </div>
    </div>
    <Login></Login>
    <Registro></Registro>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/views/landing/_Login.vue'
import Registro from '@/views/landing/_Registro.vue'
export default {
  name: "home",
  components: {
    Login,
    Registro
  },
};
</script>
<style scoped lang="scss">
  #home{
    background: url("~@/assets/imagenes/management1.png") no-repeat;
    background-size: 100% auto;
    padding-top:12rem;
    height: 800px;
  }

</style>
