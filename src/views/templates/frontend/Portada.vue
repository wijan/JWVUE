<template>
    <div id="portada">
        <navbar/>
        <div class="container" id="contenido">
          <div class="row">
            <router-view></router-view>
          </div>
        </div>
        
    </div>
    
</template>

<script>
export default {

}
</script>

<style>
#contenido{
    padding-top: 5rem;
    width: 100%;
    height: 800px;
    text-align: left;
    
  }
  
</style>