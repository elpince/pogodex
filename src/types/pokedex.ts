import { Genre } from '@/types/genre'
import { State } from '@/types/state'
import { PokemonId } from '@/types/pokemon'
import { TradeList } from '@/types/trade'
import {
  PerfectIcon,
  ShinyIcon,
  ObscureIcon,
  PurifiedIcon,
  LuckyIcon,
  MaleIcon,
  FemaleIcon,
  NoGenreIcon
} from '@/components/icons'
import { Component } from 'vue'

export type PokedexState = State | 'purified'

export type PokedexStateList = {
  [key in PokedexState]?: boolean
}

export type PokedexEntry = {
  genre: {
    [key in Genre]?: boolean
  },
  state: PokedexStateList,
  trade: TradeList,
  versions?: {
    [key: PokemonId]: boolean
  }
}

export type Pokedex = {
  [key: PokemonId]: PokedexEntry
}

export type PokedexIcons = {
  [key in PokedexState | Genre]: Component
}

export const pokedexIcons: PokedexIcons = {
  perfect: PerfectIcon,
  shiny: ShinyIcon,
  obscure: ObscureIcon,
  purified: PurifiedIcon,
  lucky: LuckyIcon,
  male: MaleIcon,
  female: FemaleIcon,
  no_genre: NoGenreIcon
}

export type PokedexUpdatePayload = {
  id: PokemonId,
  type: 'genre' | 'state' | 'versions',
  prop: Genre | State | 'purified',
  value: boolean
}