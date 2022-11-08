<template>
  <div
    class="pogofilter"
    :class="{ 'pogofilter--open': filterOpen }"
  >
    <p class="pogofilter__title">Filter</p>
    <button
      class="pogofilter__toggle"
      @click="filterOpen = !filterOpen"
    >
      <filter-icon class="pogofilter__icon"></filter-icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FilterIcon } from './icons'

const filterOpen = ref(false)
</script>