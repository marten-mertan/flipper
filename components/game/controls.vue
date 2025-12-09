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
      How generation works (guaranteed solvable): the generator first creates a random walk that visits every cell at least once. Then it derives required visit counts from how many times the walk visited each cell: 1, 2, or &infin; (if visited 3+ times it becomes infinite). That means the generated board always has the walk shown in the "Show solution walk" as a valid solution.
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
