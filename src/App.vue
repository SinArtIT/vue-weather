<template>
  <div class="app">
    <notification-block v-if="$store.state.isNotification">
      <p v-if="$store.state.isAddBlock">Добавлено в избранное</p>
      <p v-else>Успешно удалено из Избранного!</p>
    </notification-block>
    <modal-block v-if="$store.state.isModal"></modal-block>
    <weather-navigation />
    <router-view></router-view>
  </div>
</template>

<script>
import WeatherNavigation from "@/components/WeatherNavigation.vue";
import ModalBlock from "@/components/ModalBlock.vue";
import NotificationBlock from "@/components/NotificationBlock.vue";

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      setDayData: "setDayData",
      setWeekData: "setWeekData",
    };
  },
  components: {
    WeatherNavigation,
    ModalBlock,
    NotificationBlock,
  },
  methods: {
    ...mapActions({
      fetchWeather: "fetchWeather",
      getCoordinations: "getCoordinations",
    }),
  },
  computed: {
    ...mapState({
      urlDay: "urlDay",
      urlWeek: "urlWeek",
    }),
  },
  created() {
    let urlDayName = this.urlDay;
    let urlWeekName = this.urlWeek;
    let setterDayName = this.setDayData;
    let setterWeekName = this.setWeekData;

    this.getCoordinations().then(() => {
      this.fetchWeather([setterDayName, urlDayName]);
    });
    this.fetchWeather([setterWeekName, urlWeekName]);
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.app {
  margin: 0 auto;
  width: 80%;
}
</style>