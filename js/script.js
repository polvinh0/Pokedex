const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonAnt = document.querySelector('.btn-ante')
const buttonProx = document.querySelector('.btn-prox')

let searchPokemon = 1;

const fetchpokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (apiResponse.status == 200) {
        const data = await apiResponse.json();
        return data;
        console.log(apiResponse)
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Buscando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchpokemon(pokemon);

    if (data){

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id; 
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][`front_default`];
    searchPokemon = data.id
    /* usando colchetes no lugar do ponto pois o ponto deu erro!! // por ser imagem usar o SRC */
    } else {
        pokemonName.innerHTML = 'Error 404 :´(';
        pokemonNumber.innerHTML = "";
        pokemonImage.src = "https://thumbs.dreamstime.com/z/carpinteiro-de-gato-perto-do-cubo-imposs%C3%ADvel-o-em-um-capacete-amarelo-com-grande-martelo-est%C3%A1-construindo-campo-163897424.jpg" 
    }
}

form.addEventListener('submit', (event) =>{

    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    input.value = ""

})
buttonAnt.addEventListener('click', () =>{
    if (searchPokemon>1) {

        searchPokemon-=1;
        renderPokemon(searchPokemon)
    }
    
})
buttonProx.addEventListener('click', () =>{
        
   searchPokemon+=1;
   renderPokemon(searchPokemon)

})



renderPokemon(searchPokemon)