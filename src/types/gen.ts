import { PokemonId } from '@/types/pokemon'

export const gens = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const

export type Gen = typeof gens[number]

export type GenDictionary = {
  [key in Gen]: PokemonId[]
}