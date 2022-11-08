import { PokemonId } from '@/types/pokemon'
import { StateDictionary, states } from '@/types/state'

export default function () {
  return states.reduce((a, b) => ({ ...a, [b]: [] as PokemonId[] }), {}) as StateDictionary
}