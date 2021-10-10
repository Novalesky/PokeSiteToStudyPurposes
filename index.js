import getPokeInfo from './requisitions.js'
const options_list = document.querySelectorAll('.option');
const restart_button = document.getElementById('quiz-restart')
const quiz_options = document.getElementById('quiz-options')
let movement = document.getElementById('move-hints')
let types = document.getElementById('type-hints')
let quiz_answer
let colorType =[
    {type:'water',
    color:'45, 163, 231'},
    {type:'fire',
    color:'231, 104, 45'},
    {type:'grass',
    color:'135, 231, 45'},
    {type:'ground',
    color:'185, 115, 34'},
    {type:'rock',
    color:'77, 69, 62'},
    {type:'steel',
    color:'150, 178, 190'},
    {type:'ice',
    color:'73, 193, 245'},
    {type:'electric',
    color:'245, 242, 73'},
    {type:'dragon',
    color:'28, 192, 41'},
    {type:'ghost',
    color:'196, 196, 196'},
    {type:'psychic',
    color:'159, 108, 192'},
    {type:'normal',
    color:'185, 123, 123'},
    {type:'fighting',
    color:'185, 156, 123'},
    {type:'poison',
    color:'119, 33, 168'},
    {type:'bug',
    color:'33, 168, 89'},
    {type:'flying',
    color:'14, 126, 255'},
    {type:'dark',
    color:'38, 41, 51'},
    {type:'fairy',
    color:'213, 126, 221'}]
let randomNumber = (minNum, maxNum)=>{
    let randomNumb = Math.floor(Math.random()*(maxNum - minNum + 1 )) + minNum
    return randomNumb
};
let colorPicker = (palet, type)=>{
    for(let color of palet){
        if(type == color.type){
            let pickedColor = color.color
            return pickedColor
        }
    }
}
let sortPokemon = async ()=>{
    // buscando as informações da api
    let {pokeData} = await getPokeInfo(randomNumber(1, 898));
    let pokeMoves = pokeData.moves
    let pokeTypes = pokeData.types
    movement.innerHTML = ''
    types.innerHTML = ''
    pokeTypes.forEach(element =>{
        
        let type = document.createElement('p')
        type.setAttribute('id', `${element.type.name}`)
        type.innerHTML = `
        <style>
        #${element.type.name}{
            background:rgba(${colorPicker(colorType, element.type.name)}, .5);
            color:rgba(${colorPicker(colorType, element.type.name)}, 1);
            width:5rem;
            height:2rem;
            border-radius:.6rem;
        }
        </style>
        ${element.type.name}`
        types.appendChild(type)
    })
    
    for(let i = 0; i<3; ++i ){
        
        
        console.log(pokeData)
        if(pokeMoves.length != 0){

            let move = document.createElement('p')
            move.setAttribute('class' , 'moves')
            move.innerText = `${pokeMoves[i].move.name}`
            movement.appendChild(move)

        }
        else{
            sortPokemon()
        }
    }

   
    
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