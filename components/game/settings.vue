<script setup lang="ts">
const gameStore = useGameStore()

const sollutionPreview = computed(() => {
  return gameStore.state.solution
    .map(p => `(${p.x},${p.y})`)
    .join(' → ')
})
</script>

<template>
  <div :class="$style.GameSettings">
    <div :class="$style.text">
      <div>Remaining required cells: <strong>{{ gameStore.remainingNeeded }}</strong></div>
      <div>Moves made: <strong>{{ gameStore.state.moves }}</strong></div>
      <div>Win streak: <strong>{{ gameStore.state.winStreak }}</strong></div>
    </div>

    <div :class="$style.btns">
      <UiButton
        fullWidth
        @click="gameStore.startNewGame"
      >
        New
      </UiButton>
      <UiButton
        fullWidth
        @click="gameStore.resetLevel"
      >
        Again
      </UiButton>
    </div>

    <UiInputSlider
      v-model="gameStore.state.settingsRows"
      label="Rows"
      :min="3"
      :max="16"
    />
    <UiInputSlider
      v-model="gameStore.state.settingsCols"
      label="Cols"
      :min="3"
      :max="16"
    />

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
  .GameSettings {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .btns {
    display: flex;
    gap: 1.2rem;
    justify-content: space-between;
  }

  .text {
    font-size: 1.2rem;
  }
</style>
