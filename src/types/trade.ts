import { Genre } from '@/types/genre'
import { PokedexState } from '@/types/pokedex'
import { State } from '@/types/state'

export type Trade = {
  genre?: Genre
  state?: PokedexState
}

export type NonTradable = Extract<State, 'obscure' | 'lucky' | 'perfect'>

export type TradeList = {
  in: Trade[]
  out: Trade[]
}
