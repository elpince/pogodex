import { Genre } from '@/types/genre'
import { PokedexState } from '@/types/pokedex'
import { PokemonId } from '@/types/pokemon'

export type GenreExport = {
  [key in Genre]: number
}

export type StateExport = {
  [key in PokedexState]: number
}

export type GenreImport = {
  [key: number]: Genre
}

export type StateImport = {
  [key: number]: PokedexState
}

export const genreExport: GenreExport = {
  male: 0,
  female: 1,
  no_genre: 2
}

export const genreImport: GenreImport = Object.keys(genreExport)
  .reduce((a, b) => ({ ...a, [genreExport[b as Genre]]: b }), {})

export const stateExport: StateExport = {
  perfect: 0,
  shiny: 1,
  obscure: 2,
  purified: 3,
  lucky: 4
}

export const stateImport: StateImport = Object.keys(stateExport)
  .reduce((a, b) => ({ ...a, [stateExport[b as PokedexState]]: b }), {})

export type Storage = {
  [key: PokemonId]: {
    state?: number[],
    genre?: number[],
    versions?: PokemonId[]
  }
}