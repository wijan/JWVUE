<template>
  <div class="about">
    <h1>Acerca {{id}}</h1>
    <p>
    	Buenas, soy Wijan Ruiz y soy programador
	</p>
	<button class="btn btn-success"><font-awesome-icon icon="fa-thumbs-up"/>Funciona Bootstrap</button>
  </div>
</template>
<script>
	export default{
		name: 'Tururu',
		props: {
			id: Number
		}
	}
</script>