import { PokemonId } from '@/types/pokemon'
import { GenDictionary, gens } from '@/types/gen'

export default function () {
  return gens.reduce((a, b) => ({ ...a, [b]: [] as PokemonId[] }), {}) as GenDictionary
}