<template>
  <div
    class="pogocard"
    :class="{ 'pogocard--visible': pokemon.visible }"
  >
    <div
      class="pogocard__img"
      :style="styles"
    >
      <img v-if="pokemon.visible" :src="pokemon.data.img" />
      <div class="pogocard__states">
        <component
          v-for="(genre, key) in pokemon.entry.genre"
          :is="pokedexIcons[key]"
          class="pogocard__state"
          :class="{ 'pogocard__state--registered': genre }"
          :key="key"
          @click="emit('update', {
            type: 'genre',
            prop: key,
            value: !genre
          })"
        ></component>
        <component
          v-for="(state, key) in pokemon.entry.state"
          :is="pokedexIcons[key]"
          class="pogocard__state"
          :class="{ 'pogocard__state--registered': state }"
          :key="key"
          @click="emit('update', {
            type: 'state',
            prop: key,
            value: !state
          })"
        ></component>
      </div>
    </div>
    <div class="pogocard__content">
      <p class="pogocard__title">{{ pokemon.id }}</p>
      <p class="pogocard__title">{{ pokemon.data.name.fr }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pokemon, PokemonId } from '@/types/pokemon'
import { PokedexEntry } from '@/types/pokedex'
import { computed, defineEmits, defineProps } from 'vue'
import { pokedexIcons } from '@/types/pokedex'

const props = defineProps<{
  pokemon: {
    id: PokemonId
    data: Pokemon
    entry: PokedexEntry
    visible: boolean
  }
}>()

const styles = computed(() => {
  let r: { [key: string]: string } = {}
  if (props.pokemon.data.type.length === 1) {
    r['--background'] = `var(--${props.pokemon.data.type[0]})`
  }
  if (props.pokemon.data.type.length === 2) {
    const s = `var(--${props.pokemon.data.type[0]})`
    const e = `var(--${props.pokemon.data.type[1]})`
    r['--background'] = `linear-gradient(to right, ${s} 50%, ${e} 50%)`
  }
  return r
})

const emit = defineEmits(['update'])
</script>