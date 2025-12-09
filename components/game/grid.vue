<script setup lang="ts">
const gameStore = useGameStore()

const computedStyle = computed(() => {
  return {
    gridTemplateColumns: `repeat(${gameStore.state.cols}, 4.8rem)`,
  }
})
</script>

<template>
  <div
    :class="$style.GameGrid"
    :style="computedStyle"
  >
    <GameCell
      v-for="(cell, idx) in gameStore.flatCells"
      :key="'cell-'+idx"
      :cell="cell"
    />
  </div>
</template>

<style lang="scss" module>
  .GameGrid {
    display: grid;
    gap: .4rem;
  }
</style>
