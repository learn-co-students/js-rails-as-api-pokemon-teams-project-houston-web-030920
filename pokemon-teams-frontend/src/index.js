const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let addPokemonButton= document.getElementsByClassName("add-button")
// addPokemonButton.addEventListener('click',function(){
//   fetch("http://localhost:3000/pokemons/create", {
//       method:"POST",
//       headers:{
//           "Content-Type" : "application/json"
//       },
//       body: JSON.stringify{

//       }
//     }),
// })

 fetch("http://localhost:3000/trainers")
 .then(function(e){
   return e.json()
 })
 .then(function(trainers){
   trainers.forEach(function(trainer){
   let div= document.createElement('div')
   div.className='card'
   let p= document.createElement('p')
   p.innerHTML= trainer.name
   div.append(p)

   let addButton= document.createElement('button')
   addButton.innerHTML= "Add Pokemon"
   addButton.className='add-button'
   addButton["data-trainer-id"]= trainer.id

   let pokemonUl= document.createElement('ul')
   trainer.pokemons.forEach(function(pokemon){
       let pokemonLi= document.createElement('li')
       pokemonLi.innerHTML= pokemon.nickname
       pokemonUl.append(pokemonLi)
//      console.log(trainer)
   })   
   
   div.append(addButton)
   div.append(pokemonUl)
   document.querySelector("main").append(div)
   })
 })
