import { PokemonId } from '@/types/pokemon'
import { GenreDictionary, genres } from '@/types/genre'

export default function () {
  return genres.reduce((a, b) => ({ ...a, [b]: [] as PokemonId[] }), {}) as GenreDictionary
}

// if no_genre can't be male or female, if male or female can't be no_genre