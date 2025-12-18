<script setup lang="ts">
interface Props {
  fullWidth?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  fullWidth: false,
})

const $style = useCssModule()
const classList = computed(() => {
  return {
    [$style._fullWidth]: props.fullWidth,
  }
})
</script>

<template>
  <button :class="[$style.UiButton, classList]">
    <div :class="$style.inner">
      <slot />
    </div>
  </button>
</template>

<style lang="scss" module>
$padding-top: .4rem;
$primary-color: $black;
$secondary-color: $red-light;
$text-color: $white;

.UiButton {
  position: relative;
  cursor: pointer;
  padding-top: $padding-top;

  &:after {
    content: '';
    position: absolute;
    top: $padding-top;
    left: 0;
    width: 100%;
    height: calc(100% - $padding-top);
    background-color: $secondary-color;
    z-index: -1;
  }

  &:hover {
    .inner {
      transform: translate(0, 0);
    }
  }

  &._fullWidth {
    width: 100%;
  }
}

.inner {
  font-size: 1.6rem;
  background-color: $primary-color;
  color: $text-color;
  font-weight: bold;
  padding: 1.2rem 2.4rem;
  transform: translate(0, -$padding-top);
  pointer-events: none;
  transition: transform $default-transition;
}
</style>
