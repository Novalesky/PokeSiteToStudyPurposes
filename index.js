
import getPokeInfo from './requisitions.js'
// import "./index.css"
const options_list = document.querySelectorAll('.quiz__content__option__img');
const restart_button = document.querySelector('#quiz__content__restart')
const quiz_options = document.querySelector('#quiz__content__options')
let movement = document.querySelector('#quiz__content__moves')
let types = document.querySelector('#quiz__content__type')
const ranking = document.querySelector('#ranking')
const list = document.querySelectorAll('.ranking__span__voteConfirm')
console.log(options_list)
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
let pickAndPrintPokeType = (array)=>{
    array.forEach(element =>{
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
}

let setMoves = (array)=>{    
    for(let i = 0; i<3; ++i ){
        
        if(array.length != 0){

            let move = document.createElement('p')
            move.setAttribute('class' , 'moves')
            move.innerText = `${array[i].move.name}`
            movement.appendChild(move)

        }
        else{
            sortPokemon()
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
    
    pickAndPrintPokeType(pokeTypes)
    
   setMoves(pokeMoves)
    
    // resetando e sorteando um pokemon
    options_list.forEach(element => {
        element.setAttribute('src', '')
        element.classList.remove('right')
        element.classList.remove('wrong')});
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
quiz_options.addEventListener('click', event =>{
    
        let getProperty
        let answer_verify = event.target.id === quiz_answer.id
        options_list.forEach(element=>{
            if(element.classList.contains('right')){
                return getProperty = -1
            }
        })
            
            if(answer_verify && !getProperty){
                event.target.classList.add('right')
                setTimeout(sortPokemon, 2000 )
                
                }
            else if(!answer_verify && !getProperty) {
                event.target.classList.add('wrong')
                quiz_answer.classList.add('right')
                setTimeout(sortPokemon, 2000)    
                
            }
            
    
})


let vote = (event) => {
    let votated = event.target.nextElementSibling
    let rate = event.target.nodeName == 'IMG'
    if(rate){
       list.forEach(element =>{
           element.classList.remove('ranking__span__voteConfirm__confirmed')
           votated.classList.add('ranking__span__voteConfirm__confirmed')
       })
       
    }
}
ranking.addEventListener('click', vote)
