<script setup lang="ts">
const gameStore = useGameStore()
</script>

<template>
  <div :class="$style.GameControls">
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
</template>

<style lang="scss" module>
  .GameControls {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: .4rem;
    justify-content: center;
    align-items: flex-start;

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
