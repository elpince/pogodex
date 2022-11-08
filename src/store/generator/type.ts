import { TypeDictionary, types } from '@/types/type'
import { PokemonId } from '@/types/pokemon'

export default function () {
  return types.reduce((a, b) => ({ ...a, [b]: [] as PokemonId[] }), {}) as TypeDictionary
}