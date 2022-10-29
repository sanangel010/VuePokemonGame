<template>
    <h1 v-if="!pokemon">ESPERA UN MOMENTO .........</h1>
    <div v-else>
        <h1>¿ Quién es este pokémon ?</h1>
            <!-- TODO: Pictures     -->
            <PokemonPicture 
                :pokemon-id="pokemon.id" 
                :show-pokemon="showPokemon"
                />      
            <!-- TODO: Opciones -->
            <PokemonOptions 
                :pokemons="pokemonArr"
                @selection-pokemon="checkAnswer"
                />
            <template v-if="showAnswer">            
                <h2 class="fade-in"> {{ message }} </h2>
                <button @click="newGame">
                    Nuevo Juego
                </button>
            </template>
        </div>        
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '@/components/PokemonPicture.vue';

import getPokemonOptions from '@/helpers/getPokemonOptions'

//console.log( getPokemonOptions() )

export default {

    components: {
    PokemonPicture,
    PokemonOptions
    },
    // El data es un método que tiene que retornar un objeto reactivo
    // (esta al pendiente de los cambios que sucedan dentro de el y
    // se va a encargar de renderizar lo que haya que volver a renderizar.)
    data() {
        return {
            // Es el arreglo que se va a estar mandando al componente.
            pokemonArr: [],
            // Para saber el pokemon que la gente tiene que adivinar.
            pokemon: null,
            // Propiedad dependera si la selección del pokemon se hace o no.
            showPokemon: false,
            // Propiedad para mostrar la respuesta
            showAnswer: false,
            message: ' '

        }
    },
    methods: {
        // Esto es una promesa, hay que esperar a que la promesa se resuelva para poder establecerlo
       async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()
            //console.log(this.pokemonArr)

            // Se crea un número aleatorio de 0 a 3 para poder asignar los nombres aleatorios
            // del arrelgo de  la línea anterior: this.pokemonArr
            const randInt = Math.floor( Math.random() * 4 )
            
            // Se asigna en la variable pokemon de reciente creación.
            // Este es el pokemon bueno.
            this.pokemon = this.pokemonArr[ randInt ]
        },
        checkAnswer( pokemonId) {
            this.showPokemon = true
            this.showAnswer = true
            
            // console.log('Pokemon Page Llamado', pokemonId)
            // console.log('Pokemon Page Bueno', this.pokemon.id)
            if(pokemonId === this.pokemon.id) {
                this.message = `Correcto, ${ this.pokemon.name }`
            }else{
                this.message = `Ooops, era: ${ this.pokemon.name }`
            }
            
        },
        // Método que inicializa los valores por defecto
        newGame(){

            //window.location.reload();
            this.pokemonArr = []            
            this.pokemon = null            
            this.showPokemon = false            
            this.showAnswer = false
            this.message = ' '

            this.mixPokemonArray()
        }
    },
    // Un hook es algo que se engancha a un componente y esta asociado cuando
    // se destruye o construye el componente
    mounted(){
        this.mixPokemonArray()
    }
}
</script>
