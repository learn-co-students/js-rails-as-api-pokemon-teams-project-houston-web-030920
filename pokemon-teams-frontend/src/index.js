const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


fetch("http://localhost:3000/trainers")
  .then(function (e) {
    return e.json()
  })
  .then(function(trainers) {
    trainers.forEach(function (trainer) {
      let div = document.createElement('div')
      div.className = 'card'
      let p = document.createElement('p')
      p.innerHTML = trainer.name
      div.append(p)

      let addButton = document.createElement('button')
      addButton.innerHTML = "Add Pokemon"
      addButton.className = 'add-button'
      addButton["data-trainer-id"] = trainer.id


      addButton.addEventListener('click', function() {
        
        if(pokemonUl.children.length<6){
          
        

        fetch("http://localhost:3000/pokemons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify
          ({
            trainer_id: trainer.id         
          })
        })
        .then(function(response){
          return response.json();
        })
        .then(function(pokemon){
            let pokemonLi = document.createElement('li')
            pokemonLi.innerHTML = `${pokemon.nickname}(${pokemon.species})`
            let releaseButton= document.createElement('button')
            releaseButton.className="release"
            releaseButton.innerHTML="Release"
            releaseButton["data-pokemon-id"]= pokemon.id
            pokemonLi.append(releaseButton)
            pokemonUl.append(pokemonLi)
            releaseButton.addEventListener('click',function(){
            fetch(`http://localhost:3000/pokemons/${pokemon.id}`,{
              method:"DELETE"
      
            })
            pokemonLi.remove();
          })
             
            })
      
       }
    })
      let pokemonUl = document.createElement('ul')
      trainer.pokemons.forEach(function (pokemon) {
        let pokemonLi = document.createElement('li')
        pokemonLi.innerHTML = `${pokemon.nickname}(${pokemon.species})`
        let releaseButton= document.createElement('button')
        releaseButton.className="release"
        releaseButton.innerHTML="Release"
        releaseButton["data-pokemon-id"]= pokemon.id
        pokemonLi.append(releaseButton)
        pokemonUl.append(pokemonLi)
        releaseButton.addEventListener('click',function(){
          fetch(`http://localhost:3000/pokemons/${pokemon.id}`,{
             method:"DELETE"
    
          })
          pokemonLi.remove();
        })
        
      })

      div.append(addButton)
      div.append(pokemonUl)
      document.querySelector("main").append(div)
    })
  })





// let releaseButton= document.createElement('button')
// releaseButton["data-trainer-id"]= pokemon.id
// releaseButton.className="release"
// releaseButton.innerHTML= "Release"
// // pokemonLi.append(releaseButton)
// releaseButton.addEventListener("click", function(){
//   fetch(`${BASE_URL}/pokemons/${pokemon.id}`, {
//     method: "DELETE",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify({
//       pokemon_id: pokemon.id,
//       trainer_id: trainer.id,
//     }),
//   });
//   pokemonLi.remove();
// });
// pokemonLi.append(removePokemon);

// })
//    })   












