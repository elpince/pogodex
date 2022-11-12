<template>
  <div class="pogolist">
    <pogo-card
      v-for="item in filteredList"
      :key="item"
      ref="cards"
      :pokemon="{
        id: item,
        data: pokemonList[item] || formList[item],
        entry: pokedex[item],
        visible: visibleCards.includes(item)
      }"
      :id="item"
      @update="(d) => updatePokedexEntry(item, d)"
    ></pogo-card>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed, ref } from 'vue'
import PogoCard from '@/components/PogoCard.vue'
import { PokedexUpdatePayload } from '@/types/pokedex'
import { PokemonId } from '@/types/pokemon'
import { whenever } from '@vueuse/core'

const store = useStore()

const filteredList = computed(() => store.state.filteredList)
const pokemonList = computed(() => store.state.dictionaries.pokemon)
const formList = computed(() => store.state.dictionaries.form)
const pokedex = computed(() => store.state.pokedex)

const updatePokedexEntry = (id: PokemonId, { type, prop, value }: PokedexUpdatePayload) => {
  let t
  switch (type) {
    case 'state' :
      t = 'updatePokedexState'
      break
    case 'genre' :
      t = 'updatePokedexGenre'
      break
    case 'versions' :
      t = 'updatePokedexVersions'
      break
  }
  store.commit(t, {
    id: id,
    prop: prop,
    value: value
  })
}

const visibleCards = ref<PokemonId[]>([])
const cards = ref<typeof PogoCard[] | null>(null)

const observer = new IntersectionObserver((entries) => {
  entries
    .filter(entry => entry.isIntersecting)
    .forEach(entry => {
      visibleCards.value.push(entry.target.id)
      observer.unobserve(entry.target)
    })
}, {
  threshold: 0.2
})

whenever(cards, () => {
  if (!cards.value) return
  cards.value.forEach((card) => {
    observer.observe(card.$el)
  })
})
</script>