<script setup lang="ts">
</script>

<template>
  <div :class="$style.GameAvatar" />
</template>

<style lang="scss" module>
  .GameAvatar {
    width: 21.2rem;
    height: 26.4rem;
    background-image: url('~/public/img/player/avatar.png');
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    border: .1rem solid $black;
    border-radius: .8rem;
  }
</style>
