<template>
  <div class="weather-city-block">
    <slot></slot>
  </div>
</template>

<style scoped>
.weather-city-block {
  width: calc(50% - 20px);
  margin: 20px 10px;
}
</style>