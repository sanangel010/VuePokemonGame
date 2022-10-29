<template>
  <h3>Pokemón picture</h3>

  <div class="pokemon-container">
   <!-- TODO: Pictures     -->
    <img 
        :src="imgSrc" 
        class="hidden-pokemon"
        alt="pokemon">

    <img v-if="showPokemon"
        :src="imgSrc" 
        class="fade-in"
        alt="pokemon">
   <!-- TODO: Opciones -->
  </div>
</template>

<script>
  export default {
    //Las prop permiten definir la propiedad envíada desde la etiqueta del componente en la PokemonOAgeVue
    props: {
      
        pokemonId: {
            type: Number,
            required: true
        },
        showPokemon: {
            type: Boolean,
            required: true,
            default: false
        }

    },
    // el data permiteasignar el valor recibido desde 
    data() {

        return {
           pokemonId: this.pokemonId
        }

    },
    computed: {
      
        imgSrc() {
           return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ this.pokemonId }.svg`
        }

    }

  }
</script>

<!-- Cuando se quiere que un estilo se aplique solo a un componente se usa la palabra reservada scoped -->
<style scoped>
/* Pokemon Picture */
.pokemon-container {
    height: 200px;
}
img {
    height: 200px;
    position: absolute;
    right: 37%;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
.hidden-pokemon {
  /* Hace que la imagen se quede en negro sin brillo */
    filter: brightness(0);
}
</style>