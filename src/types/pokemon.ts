import { Type } from '@/types/type'
import { Collectible } from '@/types/collectible'
import { Name } from '@/types/name'

export type PokemonId = string

export type JsonPokemon = {
  id: PokemonId
  name_fr: string
  name_en: string
  img: string
  type: string
  male: boolean
  female: boolean
  no_genre: boolean
  perfect: boolean
  lucky: boolean
  shiny: boolean
  obscure: boolean
  gen: number
  base: string
}

export type Pokemon = {
  name: Name
  img: string
  type: Type[]
  collectible: Collectible
  gen: number
  versions: PokemonId[]
  forms: PokemonId[]
}

export type PokemonDictionary = {
  [key: PokemonId]: Pokemon
}

export type Form = Pick<Pokemon, 'name' | 'img' | 'type' | 'collectible'> & { base: string }

export type FormDictionary = {
  [key: PokemonId]: Form
}

export type Version = Pick<Pokemon, 'name' | 'img'> & { base: string }

export type VersionDictionary = {
  [key: PokemonId]: Version
}

export function isForm(pokemon: Pokemon | Form): pokemon is Form {
  return (<Form>pokemon).base !== undefined
}