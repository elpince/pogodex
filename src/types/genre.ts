import { PokemonId } from '@/types/pokemon'

export const genres = ['male', 'female', 'no_genre'] as const

export type Genre = typeof genres[number]

export type GenreDictionary = {
  [key in Genre]: PokemonId[]
}