<script setup lang="ts">
const gameStore = useGameStore()
</script>

<template>
  <div :class="$style.GameControls">
    <UiInputSlider
      v-model="gameStore.state.optionsRows"
      label="Rows"
      :min="3"
      :max="16"
    />
    <UiInputSlider
      v-model="gameStore.state.optionsCols"
      label="Cols"
      :min="3"
      :max="16"
    />

    <UiButton @click="gameStore.generate">
      Generate solvable field
    </UiButton>
    <UiButton @click="gameStore.resetPlayer">
      Reset player
    </UiButton>
    <UiButton @click="gameStore.toggleShowSolution">
      Show solution walk
    </UiButton>

    <div v-if="gameStore.state.showSolution">
      <div :class="$style.text">
        Solution walk (preview)
      </div>
      <div :class="$style.text">
        {{ gameStore.state.solution.map(p => `(${p.x},${p.y})`).join(' → ') }}
      </div>
    </div>

    <div :class="$style.text">
      How generation works (guaranteed solvable): <br>
      1. A random walk is generated that covers at least 80% of the grid cells. <br>
      2. The cells visited by the walk are flipped to "on". <br>
      3. The player starts at the beginning of the walk. <br>
      4. The goal is to step on all "on" cells to turn them "off". <br>
      5. The solution walk is provided as a hint. <br>
    </div>
  </div>
</template>

<style lang="scss" module>
  .GameControls {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .text {
    font-size: 1.2rem;
  }
</style>
