import { Type, types } from '@/types/type'
import { Form, JsonPokemon, Pokemon, Version } from '@/types/pokemon'
import { Genre, genres } from '@/types/genre'
import { StateList, states } from '@/types/state'

export function pokemon (pokemon: JsonPokemon): Pokemon {
  return {
    name: {
      en: pokemon.name_en,
      fr: pokemon.name_fr
    },
    img: pokemon.img,
    type: convertType(pokemon),
    collectible: {
      genre: convertGenre(pokemon),
      state: convertState(pokemon)
    },
    gen: pokemon.gen,
    versions: [],
    forms: []
  }
}

export function form (pokemon: JsonPokemon): Form {
  return {
    name: {
      en: pokemon.name_en,
      fr: pokemon.name_fr
    },
    img: pokemon.img,
    type: convertType(pokemon),
    collectible: {
      genre: convertGenre(pokemon),
      state: convertState(pokemon)
    },
    base: pokemon.base
  }
}

export function version (pokemon: JsonPokemon): Version {
  return {
    name: {
      en: pokemon.name_en,
      fr: pokemon.name_fr
    },
    img: pokemon.img,
    base: pokemon.base
  }
}

const convertType = (pokemon: JsonPokemon): Type[] => {
  return types.filter((type) => pokemon.type.includes(type))
}

const convertGenre = (pokemon: JsonPokemon): Genre[] => {
  return genres.filter((genre) => pokemon[genre])
}

const convertState = (pokemon: JsonPokemon): StateList => {
  return states.reduce((a, b) => ({ ...a, [b]: pokemon[b] }), {}) as StateList
}