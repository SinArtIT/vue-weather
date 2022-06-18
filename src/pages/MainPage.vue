<template>
  <div v-if="!$store.state.isLoading && this.dataDay.name" class="container">
    <WeatherBlock :dataList="this.dataDay"></WeatherBlock>
    <WeatherWeekBlock :dataList="this.dataWeek"></WeatherWeekBlock>
    <WeatherDaylight :dataList="this.dataDay"></WeatherDaylight>
  </div>
</template>

<script>
import WeatherBlock from "@/components/WeatherBlock.vue";
import WeatherWeekBlock from "@/components/WeatherWeekBlock.vue";
import WeatherDaylight from "@/components/WeatherDaylight.vue";

import { mapState } from "vuex"; //импорт событий из store

export default {
  components: {
    WeatherBlock,
    WeatherWeekBlock,
    WeatherDaylight,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      dataDay: "dayData",
      dataWeek: "weekData",
    }),
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 200px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}
.weather {
  grid-row-start: 1;
  grid-row-end: 4;
}
.weather-daylight {
  grid-row-start: 4;
  grid-row-end: 5;
}
</style>