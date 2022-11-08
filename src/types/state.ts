import { PokemonId } from '@/types/pokemon'

export const states = ['perfect', 'shiny', 'obscure', 'lucky'] as const

export type State = typeof states[number]

export type StateList = {
  [key in State]: boolean
}

export type StateDictionary = {
  [key in State]: PokemonId[]
}
