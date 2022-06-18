<template>
  <div class="weather-week-item">
    <div class="weather-week-item__day">
      {{ date.dayName }}, {{ date.day }}.{{ date.month }}
    </div>
    <div class="weather-week-item__temperature">
      {{ curTemp }}
    </div>
    <div class="weather-week-item__cloudness">
      <img :src="imgUrl" alt="icon" />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: ["item"],
  data() {
    return {
      curTemp: this.item.temp.day.toFixed(1),
      imgUrl: `http://openweathermap.org/img/wn/${this.item.weather[0].icon}@2x.png`,
      date: {},
    };
  },
  methods: {
    ...mapActions({
      setDate: "setDate",
    }),
  },
  mounted() {
    this.setDate(this.item.dt).then((data) => (this.date = data));
  },
};
</script>
<style scoped>
.weather-week-item {
  box-shadow: 5px 5px 10px #2c394f;
  color: #fff;
  background: #475D80;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 30px;
  height: 200px;
}
.weather-week-item__day {
  grid-column-start: 1;
  grid-column-end: 3;

  font-size: 18px;
}
.weather-week-item__temperature {
  display: flex;
  align-items: center;
  justify-content: center;

  color: rgb(255, 240, 126);
  font-size: 22px;
}
</style>