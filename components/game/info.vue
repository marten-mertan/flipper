<script setup lang="ts">
const gameStore = useGameStore()
</script>

<template>
  <div :class="$style.GameInfo">
    <div :class="$style.text">
      <div>Remaining required cells: <strong>{{ gameStore.remainingNeeded }}</strong></div>
      <div>Moves made: {{ gameStore.state.moves }}</div>
    </div>

    <div :class="$style.arrows">
      <UiButton @click="gameStore.move('up')">
        ▲
      </UiButton>
      <UiButton @click="gameStore.move('left')">
        ◀
      </UiButton>
      <UiButton @click="gameStore.move('right')">
        ▶
      </UiButton>
      <UiButton @click="gameStore.move('down')">
        ▼
      </UiButton>
    </div>
  </div>
</template>

<style lang="scss" module>
  .GameInfo {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .text {
    font-size: 1.2rem;
  }

  .arrows {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(2, auto);
    gap: .4rem;
    justify-content: center;
    align-items: center;

    & > :nth-child(1) {
      grid-column: 2;
      grid-row: 1;
    }

    & > :nth-child(2) {
      grid-column: 1;
      grid-row: 2;
    }

    & > :nth-child(3) {
      grid-column: 3;
      grid-row: 2;
    }

    & > :nth-child(4) {
      grid-column: 2;
      grid-row: 2;
    }
  }
</style>
