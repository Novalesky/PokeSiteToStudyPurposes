import getPokeInfo from './requisitions.js'
const options_list = document.querySelectorAll('.option');
const restart_button = document.getElementById('quiz-restart')
const quiz_options = document.getElementById('quiz-options')
let quiz_answer
let randomNumber = (minNum, maxNum)=>{
    let randomNumb = Math.floor(Math.random()*(maxNum - minNum + 1 )) + minNum
    return randomNumb
};
let sortPokemon = async ()=>{
    // buscando as informações da api
    let {pokeData,} = await getPokeInfo(randomNumber(1, 898));

   
    
    // resetando e sorteando um pokemon
    options_list.forEach(element => {
        element.setAttribute('src', '')
        element.classList.remove('right')});
    quiz_answer = options_list[randomNumber(0, 3)]
    quiz_answer.setAttribute('src', pokeData.sprites.front_default);
    
    // imprimindo o resto dos pokemons no game
    options_list.forEach(async element =>{
        let pokeRandom = await getPokeInfo(randomNumber(1, 898));
        let att_verify = element.attributes.src.value == ""
        
        
        if(att_verify){
            element.setAttribute('src', pokeRandom.pokeData.sprites.front_default)
        }
    })


};
sortPokemon();

// resetando o game
restart_button.addEventListener('click', async event => {
    sortPokemon()
})

// fazendo a tentativa de acertar
quiz_options.addEventListener('click', event=>{
    let answer_verify = event.target.id === quiz_answer.id
    if(answer_verify){
        event.target.classList.add('right')
        console.log('acertou')
    }
})