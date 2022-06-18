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

import { mapState, mapActions } from "vuex";

export default {
  components: {
    WeatherBlock,
    WeatherWeekBlock,
    WeatherDaylight,
  },
  computed: {
    ...mapState({
      urlDay: "urlDay",
      urlWeek: "urlWeek",
      dataDay: "curCityData",
      dataWeek: "curWeekData",
    }),
  },
  methods: {
    ...mapActions({
      fetchWeather: "fetchWeather",
    }),
  },
  created() {
    this.fetchWeather([
      "setCurWeekData",
      this.urlWeek,
      this.dataDay.coord.lat,
      this.dataDay.coord.lon,
    ]);
  },
};
</script>
<style scoped>
</style>