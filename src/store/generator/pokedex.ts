import { PokedexEntry, PokedexStateList } from '@/types/pokedex'
import { Form, isForm, Pokemon } from '@/types/pokemon'
import { genres } from '@/types/genre'
import { states } from '@/types/state'

export default function (pokemon: Pokemon | Form): PokedexEntry {
  const p: PokedexEntry = {
    genre: generateGenre(pokemon),
    state: generateState(pokemon),
    trade: {
      in: [],
      out: []
    }
  }
  if (!isForm(pokemon)) p.versions = generateVersions(pokemon)
  return p
}

const generateGenre = (pokemon: Pokemon | Form) => {
  return genres
    .filter((genre) => pokemon.collectible.genre.includes(genre))
    .reduce((a, b) => ({ ...a, [b]: false }), {})
}

const generateState = (pokemon: Pokemon | Form) => {
  const s = states
    .filter((state) => pokemon.collectible.state[state])
    .reduce((a, b) => ({ ...a, [b]: false }), {} as PokedexStateList)
  if (pokemon.collectible.state.obscure) s.purified = false
  return s
}

const generateVersions = (pokemon: Pokemon) => {
  return pokemon.versions.reduce((a, b) => ({ ...a, [b]: false }), {})
}