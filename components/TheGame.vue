<script setup lang="ts">
import { useGameStore } from '~/stores/game'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.startNewGame()
  window.addEventListener('keydown', gameStore.onKey)
})
</script>

<template>
  <div :class="$style.TheGame">
    <GameAside />
    <GameGrid :class="$style.grid" />
  </div>
</template>

<style lang="scss" module>
  .TheGame {
    display: grid;
    grid-template-columns: 46rem 1fr;
    gap: 2rem;
    align-items: start;
  }

  .grid {
    justify-self: center;
  }
</style>
