<script setup lang="ts">
const inputSliderValue = ref(50)
</script>

<template>
  <div :class="[$style.UiPage, 'page']">
    <div :class="[$style.container, 'container']">
      <UiButton>
        Test Button
      </UiButton>
      <UiInputSlider
        v-model="inputSliderValue"
        :min="0"
        :max="100"
        label="Test Slider"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.UiPage {
  //
}

.container {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
</style>
