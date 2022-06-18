<template>
  <div class="container">
    <div v-if="dataList.length > 1" class="weather-block">
      <block-item v-for="item in dataList" :key="item.id">
        <a @click="moveTo(item)" class="weather-block__link">
          <WeatherBlock :dataList="item" :addActive="true"></WeatherBlock
        ></a>
      </block-item>
    </div>
    <div v-else>Авторизируйтесь, чтобы увидеть список городов</div>
  </div>
</template>
<script>
import WeatherBlock from "@/components/WeatherBlock.vue";
import BlockItem from "@/components/WeatherCityBlock.vue";

import { mapActions } from "vuex";

export default {
  data() {
    return {
      dataList: this.$store.state.citiesWeatherList,
      list: [],
    };
  },
  components: {
    WeatherBlock,
    BlockItem,
  },
  methods: {
    ...mapActions({
      getCitiesList: "getCitiesList",
      getWeatherData: "getWeatherData",
    }),
    moveTo(data) {
      this.$store.commit("setCurCityData", data);
      this.$router.push("/city");
    },
  },
};
</script>
<style scoped>
.container {
  margin: 0 auto;
  width: 100%;
}
.weather-block {
  display: flex;
  flex-wrap: wrap;
}
.weather-block__link {
  cursor: pointer;
}
</style>