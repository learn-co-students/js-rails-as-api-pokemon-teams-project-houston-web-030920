const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */





fetch('http://localhost:3000/trainers')
    .then(function(response){
        return response.json()
    })
    .then(function(obj) {
        obj.forEach(trainer=>{
            let divTag = document.createElement('div')
            document.body.append(divTag)

            divTag.setAttribute('class', 'card')
            divTag.setAttribute('data-id', trainer.id)

            let pTag = document.createElement('p')
            pTag.innerHTML = trainer.name
            divTag.append(pTag)

            let btn = document.createElement('button')
            btn.setAttribute('data-trainer-id', trainer.id)
            btn.innerHTML = "Add Pokemon"
            divTag.append(btn)

            // let trainerId = document.querySelector('div')
            // console.log(trainer.id)
            btn.addEventListener('click', function(){
                fetch('http://localhost:3000/pokemons', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        trainer_id: trainer.id
                    })
                })
                .then(function(response){
                    return response.json()
                })
                .then(function(obj){
                    console.log(obj)
                })
            })

            let ulTag = document.createElement('ul')
            divTag.append(ulTag)

            fetch(`http://localhost:3000/trainers/${trainer.id}`)
                .then(function(response){
                    return response.json()
                })
                .then(function(obj){
                    obj.forEach(pokemon=>{
                        let liTag = document.createElement('li')
                        liTag.innerHTML = pokemon.nickname
                        ulTag.append(liTag)

                        let liBtn = document.createElement('button')
                        liBtn.innerHTML = "Release"
                        liBtn.setAttribute('class', 'release')
                        liBtn.setAttribute('data-pokemon-id', pokemon.id)
                        liTag.append(liBtn)
                    })
                })
        })
    })