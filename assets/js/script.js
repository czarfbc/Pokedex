const namePokemon = document.querySelector('.pokemon_name');
const idPokemon = document.querySelector('.pokemon_number');
const imgPokemon = document.querySelector('.pokemon_img');


const form = document.querySelector('.form');
const input = document.querySelector('.input_search');


const prev = document.querySelector('.btn_prev');
const next = document.querySelector('.btn_next');


let searchPokemon = 1;


const fetchPokemon = async (pokemon)=>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}


const renderpokemon = async (pokemon)=>{
    namePokemon.innerHTML = 'Loanding...';
    idPokemon.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        imgPokemon.style.display = 'block';

        namePokemon.innerHTML = data.name;
        idPokemon.innerHTML = data.id;

        imgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';

        searchPokemon = data.id;
        if(searchPokemon >= 650){
            imgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
        }

    }else{
        imgPokemon.style.display = 'none';
        namePokemon.innerHTML = 'Not found :(';
        
        idPokemon.innerHTML = '';
        input.value = '';
    }

}


form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderpokemon(input.value.toLowerCase());
});
prev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon--;
        renderpokemon(searchPokemon);
    }
});
next.addEventListener('click', ()=>{
    searchPokemon++;
    renderpokemon(searchPokemon);
});


renderpokemon(searchPokemon);