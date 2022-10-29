import pokemonapi from "@/api/pokemonApi"

const getPokemons = () => {
    // de esta forma crea un arreglo con 650 posiciones vacias.
    const pokemonsArr = Array.from( Array(650) )    
   
    // Map es un metodo que tiene los arreglos y ayudara a ponerle las posisciones.
    return pokemonsArr.map( ( _ , index ) => index + 1 )
}

// Se hace el mix de los pokemosnes, que basicamente es reordenarlos en función de un número aleatorios
// se obtienen los nombres de los pokemones con el metodo: getPokemonNames
const getPokemonOptions = async() => {
    
    const mixedPokemons = getPokemons()
                            .sort( () => Math.random() -0.5 )

    const pokemones = await getPokemonNames( mixedPokemons.splice(0,4) )
    //    console.table(pokemones)

    return pokemones
}

//Tradicional y para mostrar los nombres seria mediante la posición del arreglo
//const getPokemonNames = ( pokemons = [] ) => {

// desestructurando el objerto y evitar acceder mediante el indice de la posición del arreglo
const getPokemonNames = async( [a,b,c,d] = [] ) => {

    // Se realiza la petición del api de pokemon
        // const respuesta = await pokemonapi.get(`/10`)
        // console.log( respuesta.data.name, respuesta.data.id )
    
    // Promise.all => ayuda a lanzar varias peticiones de promesas de manera simultanea
    const promiseArr = [
        pokemonapi.get(`/${ a }`),
        pokemonapi.get(`/${ b }`),
        pokemonapi.get(`/${ c }`),
        pokemonapi.get(`/${ d }`)
    ]

    const [ p1,p2,p3,p4 ] = await Promise.all( promiseArr )
    //console.log(resp)

    return [
        { name: p1.data.name, id: p1.data.id },
        { name: p2.data.name, id: p2.data.id },
        { name: p3.data.name, id: p3.data.id },
        { name: p4.data.name, id: p4.data.id }
    ]

}



export default getPokemonOptions