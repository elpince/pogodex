import { PokemonId } from '@/types/pokemon'

export const types = [
  'normal',
  'fight',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'fairy',
  'dark'
] as const
export type Type = typeof types[number]

export type TypeColor = {
  [key in Type]: string
}

export const typeColors: TypeColor = {
  normal: '#EAEADE',
  fight: '#E81419',
  flying: '#5EB9B2',
  poison: '#A91AD7',
  ground: '#E1D059',
  rock: '#776B3E',
  bug: '#BDDD6E',
  ghost: '#8E56A4',
  steel: '#BBC5C4',
  fire: '#FFB416',
  water: '#36AFF6',
  grass: '#3C9707',
  electric: '#FBFE26',
  psychic: '#F55793',
  ice: '#1895A1',
  dragon: '#8A54FD',
  fairy: '#FFA0C2',
  dark: '#5E4632'
}

export type TypeDictionary = {
  [key in Type]: PokemonId[]
}