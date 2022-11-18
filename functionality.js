var number = document.getElementById('quantidade');
number.addEventListener('keyup',()=>{
    list(number.value);
})

list(1);
function list(number){
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+number)
    .then(response => response.json()).then(all =>{

        let pokemons = [];

        all.results.map((val)=>{
            fetch(val.url).then(response => response.json()).then(single=>{

                pokemons.push({name:val.name, image:single.sprites.front_default});
                
                if(pokemons.length == number){
                    let cards = document.querySelector('.cartas');
                    cards.innerHTML='';

                    pokemons.map((val)=>{
                        cards.innerHTML+=`
                            <div class="carta">
                                <img src="`+val.image+`" />
                                <p>`+val.name+`</p>
                            </div>
                        `
                    })
                }
            })   
        })
    })
}