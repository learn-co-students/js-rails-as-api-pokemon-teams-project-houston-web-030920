const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let main = document.querySelector('main')

fetch(TRAINERS_URL)
    .then(function(response){
        return response.json()
    })
    .then(function(trainers){  
        trainers.forEach(function(trainer){
        //create trainer card
            let card = document.createElement('div')
            let trainerName = document.createElement('p')
            trainerName.append(trainer.name)
            card.setAttribute('class', 'card')
            card.setAttribute('data-id', trainer.id)
            //create Pokemon UL
            let uList = document.createElement('ul')
            //Add Pokemon Btn/Function
            let addBtn = document.createElement('button')
            addBtn.append('Add Pokemon')
            addBtn.setAttribute('data-trainer-id', trainer.id)
            addBtn.addEventListener('click', function(e){
                e.preventDefault()
                if (uList.childNodes.length < 6)
                fetch(POKEMONS_URL,{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        trainer_id: `${trainer.id}`
                    })
                })
                .then(function(response){
                    return response.json()
                })
                .then(function(pokemon){
                    let pokeLi = document.createElement('li')
                    pokeLi.append(pokemon.nickname + ' (' + pokemon.species + ')')
                    let releaseBtn = document.createElement('button')
                    releaseBtn.append('Release')
                    releaseBtn.setAttribute('class', 'release')
                    releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
                    pokeLi.appendChild(releaseBtn)
                    uList.appendChild(pokeLi)
                    releaseBtn.addEventListener('click', function(e){
                        e.preventDefault()
                        fetch(`${POKEMONS_URL}/${pokemon.id}`,{
                            method: 'DELETE',
                        })
                            .then(pokeLi.remove())
                    }) 
                })
                else 
                    window.alert('No More Than 6 Pokemon!!')
            })    
            //get Pokemon list
            fetch(POKEMONS_URL)
                .then(function(response){
                    return response.json()
                })
                .then(function(pokemons){ 
                    //match pokemon to their trainer
                    let pokeList = pokemons.filter(pokemon => pokemon.trainer_id == trainer.id) 
                    pokeList.forEach(function(pokemon){
                        let pokeLi = document.createElement('li')
                        pokeLi.append(pokemon.nickname + ' (' + pokemon.species + ')')
                        let releaseBtn = document.createElement('button')
                        releaseBtn.append('Release')
                        releaseBtn.setAttribute('class', 'release')
                        releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
                        pokeLi.appendChild(releaseBtn)
                        uList.appendChild(pokeLi)
                        releaseBtn.addEventListener('click', function(e){
                            e.preventDefault()
                            fetch(`${POKEMONS_URL}/${pokemon.id}`,{
                                method: 'DELETE',
                            })
                                .then(pokeLi.remove())
                        })    
                    })
                })
        //append to page    
            main.append(card)
            card.appendChild(trainerName)
            card.appendChild(addBtn)
            card.appendChild(uList)
        })
    })  