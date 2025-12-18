<script setup lang="ts">
const gameStore = useGameStore()

const sollutionPreview = computed(() => {
  return gameStore.state.solution
    .map(p => `(${p.x},${p.y})`)
    .join(' → ')
})
</script>

<template>
  <div :class="$style.GameAside">
    <GameAvatar />
    <GameSettings />
    <GameControls />

    <div :class="$style.text">
      How generation works (guaranteed solvable): <br>
      1. A random walk is generated that covers at least 80% of the grid cells. <br>
      2. The cells visited by the walk are flipped to "on". <br>
      3. The player starts at the beginning of the walk. <br>
      4. The goal is to step on all "on" cells to turn them "off". <br>
      5. The solution walk is provided as a hint. <br>
    </div>

    <div v-if="gameStore.state.showSolution && sollutionPreview">
      <div :class="$style.text">
        Solution walk (preview)
      </div>
      <div :class="$style.text">
        {{ sollutionPreview }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  .GameAside {
    display: grid;
    grid-template-columns: 21.2rem 1fr;
    gap: 1.2rem;
    align-items: flex-start;
  }

  .text {
    font-size: 1.2rem;
  }
</style>
