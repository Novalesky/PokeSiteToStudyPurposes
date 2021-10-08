const getPokeInfo = async (numb)=>{
    let url =  `https://pokeapi.co/api/v2/pokemon/${numb}`
    const response = await fetch(url)
    let pokeData = await response.json()
    return {pokeData}
}
export default getPokeInfo