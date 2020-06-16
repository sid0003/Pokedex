const container: HTMLElement | any = document.getElementById("app")   //selecting the id app which is the id of the div tag
const pokemons: number = 100

interface IPokemon {    //contents of a pokemon obj
  id: number;
  name: string;
  image: string;
  type: string;
}

const fetchData = (): void => {   //to loop through the number of pokemon to retrieve
  for (let i = 1; i <= pokemons; i++) {
    getPokemon(i)   //for each object call getPokemon with the pokemon number
  }
}

const getPokemon = async (id: number): Promise<void> => {   //an asynchronous function that returns a Promise of type void
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemon: any = await data.json()
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ")

  const transformedPokemon = {    //mirrors the interface IPokemon
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  }

  showPokemon(transformedPokemon)
}

const showPokemon = (pokemon: IPokemon): void => {
  let output: string = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `
  container.innerHTML += output
}

fetchData()
