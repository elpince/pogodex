<template>
  <div class="pogolist">
    <pogo-card
      v-for="(item, i) in filteredList"
      :key="item"
      ref="cards"
      :pokemon="{
        id: item,
        data: pokemonList[item] || formList[item],
        entry: pokedex[item],
        visible: nextCheck > i
      }"
      @update="(d) => updatePokedexEntry(item, d)"
    ></pogo-card>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed, onMounted, ref } from 'vue'
import PogoCard from '@/components/PogoCard.vue'
import { PokedexUpdatePayload } from '@/types/pokedex'
import { PokemonId } from '@/types/pokemon'

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

const wh = ref(window.innerHeight)
const nextCheck = ref(4)
const cards = ref<HTMLElement[] | null>(null)

onMounted(() => {
  checkElementVisibility()
  window.addEventListener('scroll', checkElementVisibility)
})

const checkElementVisibility = () => {
  if (!cards.value) return
  let visible = true
  while (visible) {
    nextCheck.value++
    const r = cards.value[nextCheck.value].getBoundingClientRect()
    if (r.top > wh.value) visible = false
  }
}
</script>