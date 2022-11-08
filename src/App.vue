<template>
  <main class="main">
    <pogo-list />
  </main>
  <pogo-filter />
</template>

<script setup lang="ts">
import PogoList from '@/components/PogoList.vue'
import { useStore } from '@/store'
import { typeColors, types } from '@/types/type'
import PogoFilter from '@/components/PogoFilter.vue'

const store = useStore()

store.dispatch('getPokemonList')

const root = document.querySelector(':root') as HTMLElement
types.forEach(type => {
  root.style.setProperty(`--${type}`, typeColors[type])
})
</script>
