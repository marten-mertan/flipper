<script setup lang="ts">
import { useGameStore } from '~/stores/game'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.generate()
  window.addEventListener('keydown', gameStore.onKey)
})
</script>

<template>
  <div :class="$style.TheGame">
    <GameSettings />
    <GameGrid :class="$style.grid" />
    <GameInfo />
  </div>
</template>

<style lang="scss" module>
  .TheGame {
    display: grid;
    grid-template-columns: 24rem 1fr 20rem;
    gap: 2rem;
    align-items: start;
  }

  .grid {
    justify-self: center;
  }
</style>
