<template>
  <div class="weather">
    <div class="weather__top-part">
      <div class="weather__city">
        {{ cityName }}
        <button
          v-if="this.delActive"
          @click="removeCity()"
          class="delete-button"
        >
          Удалить
        </button>
      </div>
      <div class="weather__checkbox-block">
        <label
          v-if="
            $store.state.userIsAuth &&
            checkInputActive &&
            !this.setIsFavorite &&
            addIsVisible
          "
          :for="cityId"
          @click.stop="favorite()"
          class="add-label"
        >
          Добавить в избранное
          <input
            type="checkbox"
            name="checkbox"
            :id="cityId"
            v-model="isChecked"
            class="add-input"
          />
        </label>
      </div>
    </div>
    <div class="weather__left-part">
      <div class="weather__date">
        {{ dayTime.dayName }}, {{ dayTime.day }}.{{ dayTime.month }}
      </div>
      <div class="weather__side-info">
        <div class="weather__winde-speed side-info-item">
          Скорость ветра: {{ windSpeed }} м/с
        </div>
        <div class="weather__winde-side side-info-item">
          Направление ветра: {{ windSide }}
        </div>
        <div class="weather__pressure side-info-item">
          Давление: {{ pressure }} мм рт.ст.
        </div>
        <div class="weather__humidity side-info-item">
          Влажность: {{ humidity }} %
        </div>
      </div>
    </div>
    <div class="weather__right-part">
      <div class="weather__time">{{ dayTime.hour }}:{{ dayTime.minutes }}</div>
      <div class="weather__info">
        <div class="weather__cloudness-block">
          <img :src="weatherIconSrc" alt="icon" />
          <div class="weather__cloudiness">{{ cloudness }}</div>
        </div>
        <div class="weather__temperature">{{ curTemp }}°C</div>
        <div class="weather__feels-temperature">
          Ощущается {{ feelsTemp }}°C
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { mapActions, mapMutations } from "vuex";

export default {
  props: ["dataList", "delActive", "addActive"],
  data() {
    return {
      cityName: this.dataList.name,
      feelsTemp: this.dataList.main.feels_like.toFixed(1),
      humidity: this.dataList.main.humidity,
      curTemp: this.dataList.main.temp.toFixed(1),
      pressure: this.dataList.main.pressure,
      cloudness: this.dataList.weather[0].description,
      weatherIconSrc: `http://openweathermap.org/img/wn/${this.dataList.weather[0].icon}@4x.png`,
      windSpeed: this.dataList.wind.speed,
      windSide: this.dataList.wind.side,
      isChecked: false,
      cityId: this.dataList.id,
      cityApiId: this.dataList.server_id,
      dayTime: {},
      checkInputActive: this.addActive,
      addIsVisible: true,
    };
  },
  computed: {
    setIsFavorite() {
      let newArr = this.$store.state.favoritesСitiesList.filter(
        (item) => item.id == this.cityApiId
      );
      if (newArr.length > 0) return true;
      else return false;
    },
  },
  methods: {
    ...mapActions({
      setDate: "setDate",
      addFavorite: "addFavorite",
      removeFavorite: "removeFavorite",
    }),
    ...mapMutations({
      setIsNotification: "setIsNotification",
      setIsAddBlock: "setIsAddBlock",
    }),
    setModalTime() {
      this.setIsNotification(true);
    },
    favorite() {
      this.setIsAddBlock(true);
      this.addFavorite(this.cityApiId);
      this.toggleVisible();
      this.setModalTime();
    },
    removeCity() {
      this.setModalTime();
      this.setIsAddBlock(false);
      this.removeFavorite(this.cityApiId);
    },
    toggleVisible() {
      this.addIsVisible = !this.addIsVisible;
    },
  },

  mounted() {
    this.setDate(this.dataList.dt).then((data) => (this.dayTime = data));
  },
};
</script>

<style scoped>
.weather {
  min-height: 500px;
  box-shadow: 5px 5px 10px #2c394f;
  background-color: #475D80;
  padding: 20px 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr, 1fr;
  color: #fff;
}
.weather__top-part {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  grid-column-start: 1;
  grid-column-end: 3;
}
.weather__left-part {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}
.weather__date {
  font-size: 28px;
}
.weather__right-part {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}
.weather__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.weather__side-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 0;
}
.side-info-item {
  padding: 5px 0;
  font-size: 14px;
}
.weather__temperature {
  font-size: 34px;
  padding: 5px 0;
}
.weather__feels-temperature {
  font-size: 10px;
}
.weather__city {
  display: flex;
  align-items: center;
  font-size: 40px;

  color: rgb(255, 240, 126);
}
.weather__checkbox-block {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}
.weather__time {
  align-self: flex-end;
  font-size: 28px;
}
.weather__cloudness-block {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.add-input {
  display: none;
}
.add-label {
  padding: 20px 10px;
  cursor: pointer;
}
.add-label:hover {
  background-color: rgb(85, 85, 85);
}
.delete-button {
  padding: 10px 10px;
  margin-left: 20px;
  background-color: transparent;
  border: 1px solid #E6854C;
  color: white;
  cursor: pointer;
  font-size: 16px;
}
.delete-button:hover {
  background-color: #E6854C;
}
</style>
