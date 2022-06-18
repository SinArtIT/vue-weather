<template>
  <div class="weather-week">
    <WeatherWeekBlockItem
      v-for="item in itemList"
      :key="item.dt"
      :item="item"
    ></WeatherWeekBlockItem>
  </div>
</template>
<script>
import WeatherWeekBlockItem from "@/components/WeatherWeekBlockItem.vue";

export default {
  components: {
    WeatherWeekBlockItem,
  },
  props: ["dataList"],
  data() {
    return {
      itemList: this.dataList.daily,
    };
  },
};
</script>

<style scoped>
.weather-week {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}
</style>