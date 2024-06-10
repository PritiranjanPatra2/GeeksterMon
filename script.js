
let pokemonContainer = document.getElementById("card-container");
let user_input = document.getElementById("search");
let filterBtn = document.getElementById("filter");
let resetBtn = document.getElementById("reset");
let select_type = document.getElementById("type");
// console.log(type.value);

//Reset Button
resetBtn.addEventListener("click",function(){
    window.location.reload();
})

//Filter cards by type

filterBtn.addEventListener("click", function(){
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(function(card){
        let pokemonType = card.children[0].children[0].children[3].innerText;
        if(pokemonType === select_type.value){
            card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }
    })
})





//Creating pokemon Card

function createPokemonCard(details){
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`
        <div class="inner-card" id="${details.types[0].type.name}"> 
        <div class="front-card">
        <div class="id">${details.id}</div>
        <img src="${details.sprites.front_default}">
        <div class="name">${details.name}</div>
        <div class="type">${details.types[0].type.name}</div>
        <div class="stats">${details.stats[0].base_stat}</div>
        </div>

        <div class="back-card">
        <img src='${details.sprites.back_default}'/>
        <div class="name">${details.name}</div>
        <div class="ability">${details.abilities[0].ability.name}</div>
        </div>
        </div>
    `;
     return card;
}


//Searching card with user input

user_input.addEventListener("input", function(){
    let searchValue = user_input.value;
     let allCards = document.querySelectorAll(".card");
    //  console.log(allCards);
     allCards.forEach(function(card){
        let pokemonName = card.children[0].children[0].children[2].innerText;
        if(pokemonName.startsWith(searchValue)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        } 
     })

})

//Fetching Pokemon API

async function fetchPokemon(i){
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let result = await data.json();
    return result;
}

//Fetch pokemon data

async function fetchMaindata() {
    for (let i = 1; i <= 151; i++) {
      let pokemon = await fetchPokemon(i);
      let card = createPokemonCard(pokemon);
      pokemonContainer.appendChild(card);
    }
  }
  
  fetchMaindata();