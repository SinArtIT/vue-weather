<template>
  <div class="favorites">
    <select @change="sortList($event)" class="favorites__filter-alphabet">
      <option disabled value="" selected="selected">
        Сортировка по алфавиту
      </option>
      <option value="alphabetdawn">А-Я</option>
      <option value="alphabetup">Я-А</option>
    </select>
    <div class="favorites-cities" v-if="this.getFavoritesCitiesList.length > 0">
      <div
        class="favorites-cities__block"
        v-for="item in this.getFavoritesCitiesList"
        :key="Math.random() * item.id"
      >
        <weather-block
          :dataList="item"
          :delActive="true"
          :addActive="false"
        ></weather-block>
      </div>
    </div>
    <div class="favorite-cities__empty" v-else>
      <p>Здесь пока пусто!</p>
    </div>
  </div>
</template>
<script>
import WeatherBlock from "@/components/WeatherBlock.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    WeatherBlock,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getFavoritesCitiesList: "getFavoritesCitiesList",
    }),
  },
  methods: {
    ...mapActions({
      fetchFavorites: "fetchFavorites",
    }),
    sortList(event) {
      let arr = this.$store.state.citiesWeatherList.sort((city1, city2) => {
        return city1["name"].localeCompare(city2["name"]);
      });
      if (event.target.value == "alphabetdawn")
        this.$store.commit("setCitiesWeatherList", arr);
      else this.$store.commit("setCitiesWeatherList", arr.reverse());
    },
  },
  created() {
    console.log("yes");
    this.fetchFavorites().then(() => {
      let arr = this.$store.state.citiesWeatherList.sort((city1, city2) => {
        return city1["name"].localeCompare(city2["name"]);
      });
      this.$store.commit("setCitiesWeatherList", arr);
    });
  },
};
</script>
<style scoped>
.favorites-cities {
  display: flex;
  flex-wrap: wrap;
}
.favorites-cities__block {
  width: calc(50% - 20px);
  margin: 20px 10px;
}
.favorites__filter-alphabet {
  width: 200px;
  padding: 5px;
  margin-bottom: 20px;
  border: 1px solid lightskyblue;
}
</style>