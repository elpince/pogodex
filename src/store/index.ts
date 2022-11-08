import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { FormDictionary, JsonPokemon, PokemonDictionary, PokemonId, VersionDictionary } from '@/types/pokemon'
import generator from './generator'
import { Type, TypeDictionary, types } from '@/types/type'
import { Genre, GenreDictionary, genres } from '@/types/genre'
import { StateDictionary, states } from '@/types/state'
import { Gen, GenDictionary } from '@/types/gen'
import { Pokedex, PokedexState, PokedexUpdatePayload } from '@/types/pokedex'
import { Storage } from '@/types/storage'

export interface State {
  dictionaries: {
    pokemon: PokemonDictionary,
    version: VersionDictionary,
    form: FormDictionary,
    type: TypeDictionary,
    genre: GenreDictionary,
    state: StateDictionary,
    gen: GenDictionary
  },
  pokedex: Pokedex,
  filteredList: PokemonId[],
  storage: Storage
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    dictionaries: {
      pokemon: {},
      version: {},
      form: {},
      type: generator.type(),
      genre: generator.genre(),
      state: generator.state(),
      gen: generator.gen()
    },
    pokedex: {},
    filteredList: [],
    storage: {}
  },
  getters: {
  },
  mutations: {
    generateDictionaries(state, list: JsonPokemon[]) {
      list.forEach((pokemon) => {
        // generate pokemon, form or version
        if (pokemon.base) {
          if (!pokemon.type) {
            state.dictionaries.version[pokemon.id] = generator.version(pokemon)
            if (state.dictionaries.pokemon[pokemon.base]) {
              state.dictionaries.pokemon[pokemon.base].versions.push(pokemon.id)
            } else {
              console.warn(`unknown pokemon "${pokemon.base}", versions should be declared after base pokemon`)
              return
            }
            return
          }
          state.dictionaries.form[pokemon.id] = generator.form(pokemon)
          if (state.dictionaries.pokemon[pokemon.base]) {
            state.dictionaries.pokemon[pokemon.base].forms.push(pokemon.id)
          } else {
            console.warn(`unknown pokemon "${pokemon.base}", forms should be declared after base pokemon`)
            return
          }
        } else {
          state.dictionaries.pokemon[pokemon.id] = generator.pokemon(pokemon)
        }
        // populate type dictionary
        pokemon.type.split(';').forEach((type) => {
          if (!types.includes(type as Type)) {
            console.warn(`unknown type "${type}" on pokemon "${pokemon.id}"`)
            return
          }
          state.dictionaries.type[type as Type].push(pokemon.id)
        })
        // populate genre dictionary
        genres.forEach((genre) => {
          if (pokemon[genre]) state.dictionaries.genre[genre].push(pokemon.id)
        })
        // populate state dictionary
        states.forEach((st) => {
          if (pokemon[st]) state.dictionaries.state[st].push(pokemon.id)
        })
        // populate gen dictionary
        if (pokemon.gen) state.dictionaries.gen[pokemon.gen as Gen].push(pokemon.id)
      })
    },
    generatePokedex(state) {
      const pdx = localStorage.getItem('pokedex')
      if (pdx) {
        state.pokedex = JSON.parse(pdx)
      }
      const list = { ...state.dictionaries.pokemon, ...state.dictionaries.form }
      Object.keys(list).forEach((id: PokemonId) => {
        if (!pdx) state.pokedex[id] = generator.pokedex(list[id])
        state.filteredList.push(id)
      })
      state.filteredList.sort()
    },
    updatePokedexState(state, { id, prop, value }: PokedexUpdatePayload) {
      state.pokedex[id].state[prop as PokedexState] = value
      localStorage.setItem('pokedex', JSON.stringify(state.pokedex))
    },
    updatePokedexGenre(state, { id, prop, value }: PokedexUpdatePayload) {
      state.pokedex[id].genre[prop as Genre] = value
      localStorage.setItem('pokedex', JSON.stringify(state.pokedex))
    }
  },
  actions: {
    async getPokemonList({ commit }) {
      const response = await fetch('./pokemon-list.json')
      response.json().then((list) => {
        commit('generateDictionaries', list as JsonPokemon[])
        commit('generatePokedex')
      })
    }
  },
  modules: {
  }
})

export function useStore() {
  return baseUseStore(key)
}