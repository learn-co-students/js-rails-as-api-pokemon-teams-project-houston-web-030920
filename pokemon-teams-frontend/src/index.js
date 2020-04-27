const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//retrieve the trainers 
fetch(TRAINERS_URL)
    .then(function(response){
        return response.json()
    })
    //iterate through the trainers
    .then(function(trainers){
        trainers.forEach( trainer => {
           
            //Create Div
            let div = document.createElement('div')
            div.setAttribute('data-id', trainer.id)
            div.setAttribute('class', 'card')
            div.setAttribute('data-id', trainer.id)

            //Create a P Tag
            let p = document.createElement('p')
            p.innerText = trainer.name

            //Add Pokemon Button
            let pkmnList = document.createElement('ul')
            pkmnList.setAttribute('class', 'pokemon-list')
            let addPkmnBtn = document.createElement('button')
            addPkmnBtn.setAttribute('data-trainer-id', trainer.id)
            addPkmnBtn.innerText = "Add Pokemon"
            // if(ul.childNodes.length < 6)
            createPokemon(trainer, pkmnList);
            
            
            //Add Pokemon Button Functionality 
            addPkmnBtn.addEventListener('click', function() {
                console.log("running")
                if(pkmnList.childNodes.length < 6){
            //Create Pokemon Function
                fetch(POKEMONS_URL, {
                    method: 'POST',
                    headers: { 
                    'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({
                        trainer_id: `${trainer.id}`
                    })
                })
                .then(function(response){
                    return response.json()
                })
                .then(function(pokemon){
                    addPokemon(pokemon, pkmnList)
                })
            }else {
               window.alert("A trainer can only have 6 pokemon!")
            }
            })

            //Appending To the Div
            document.body.childNodes[3].append(div)
            div.append(p)
            div.append(addPkmnBtn)
            div.append(pkmnList)
        })
    })

    let createPokemon = function(trainer, pkmnList) {

        fetch(POKEMONS_URL)
        .then(function(response){
            return response.json()
        })
        .then(function(pokemons){
            let trainersPkmn = pokemons.filter(pkmn => pkmn.trainer_id == trainer.id)
            
            //Individual Pokemon
            trainersPkmn.forEach( pokemon => {
                addPokemon(pokemon, pkmnList);
            })
        })
    }
    let addPokemon = function(pokemon, pkmnList) {
    let pkmnLi = document.createElement('li')
                pkmnLi.innerHTML = `${pokemon.nickname} (${pokemon.species})`
                
                //Release Button
                let releaseBtn = document.createElement('button')
                releaseBtn.setAttribute('class','release')
                releaseBtn.setAttribute('data-pokemon-id', pokemon.id )
                releaseBtn.innerText = "Release"
                pkmnLi.append(releaseBtn)
                pkmnList.append(pkmnLi)
    
                
                //Functionality 
                releaseBtn.addEventListener('click', function () {
                  
                    fetch(`${POKEMONS_URL}/${pokemon.id}`,{
                        method: 'DELETE',
                    })

                    pkmnLi.remove()
                }) 
                
    }