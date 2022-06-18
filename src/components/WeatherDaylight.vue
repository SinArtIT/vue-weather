<template>
  <div class="weather-daylight">
    <div class="weather-daylight__day-length weather-daylight__item">
      <div class="day-hours">{{ dayLength.hours }}:{{ dayLength.minutes }}</div>
      <div class="day-text">световой день</div>
    </div>
    <div class="weather-daylight__sunrise weather-daylight__item">
      <div class="sunrise-time">
        {{ sunrise.hours }}:
        {{ sunrise.minutes }}
      </div>
      <div class="surise-text">восход</div>
    </div>
    <div class="weather-daylight__sunset weather-daylight__item">
      <div class="sunset-time">{{ sunset.hours }}:{{ sunset.minutes }}</div>
      <div class="sunset-text">закат</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dataList"],
  data() {
    return {
      sunrise: {},
      sunset: {},
      dayLength: {},
    };
  },
  methods: {
    getSunTime() {
      let sunriseTime = new Date(this.dataList.sys.sunrise * 1000);
      let sunsetTime = new Date(this.dataList.sys.sunset * 1000);
      let hoursCalc = "00";
      let minutesCalc = "00";

      this.sunrise = {
        hours:
          sunriseTime.getHours() > 9
            ? sunriseTime.getHours()
            : "0" + sunriseTime.getHours(),
        minutes:
          sunriseTime.getMinutes() > 9
            ? sunriseTime.getMinutes()
            : "0" + sunriseTime.getMinutes(),
      };
      this.sunset = {
        hours:
          sunsetTime.getHours() > 9
            ? sunsetTime.getHours()
            : "0" + sunsetTime.getHours(),
        minutes:
          sunsetTime.getMinutes() > 9
            ? sunsetTime.getMinutes()
            : "0" + sunsetTime.getMinutes(),
      };
      //вычисление времени светового дня
      switch (true) {
        case sunsetTime.getMinutes() + 60 - sunriseTime.getMinutes() >= 60:
          minutesCalc =
            sunsetTime.getMinutes() - sunriseTime.getMinutes() > 9
              ? sunsetTime.getMinutes() - sunriseTime.getMinutes()
              : "0" + (sunsetTime.getMinutes() - sunriseTime.getMinutes());
          hoursCalc =
            sunsetTime.getHours() - sunriseTime.getHours() + 1 > 9
              ? sunsetTime.getHours() - sunriseTime.getHours() + 1
              : "0" + (sunsetTime.getHours() - sunriseTime.getHours() + 1);
          break;
        case sunsetTime.getMinutes() + 60 - sunriseTime.getMinutes() > 9:
          minutesCalc = sunsetTime.getMinutes() + 60 - sunriseTime.getMinutes();
          hoursCalc =
            sunsetTime.getHours() - sunriseTime.getHours() > 9
              ? sunsetTime.getHours() - sunriseTime.getHours()
              : "0" + (sunsetTime.getHours() - sunriseTime.getHours());
          break;
        case sunsetTime.getMinutes() + 60 - sunriseTime.getMinutes() < 9:
          minutesCalc =
            "0" + sunsetTime.getMinutes() + 60 - sunriseTime.getMinutes();
          hoursCalc =
            sunsetTime.getHours() - sunriseTime.getHours() > 9
              ? sunsetTime.getHours() - sunriseTime.getHours()
              : "0" + (sunsetTime.getHours() - sunriseTime.getHours());
          break;
      }

      this.dayLength = {
        hours: hoursCalc,
        minutes: minutesCalc,
      };
    },
  },
  mounted() {
    this.getSunTime();
  },
};
</script>
<style scoped>
.weather-daylight {
  background: #475D80;
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: #fff;
}
.weather-daylight__day-length {
  grid-column-start: 1;
  grid-column-end: 3;
}
.weather-daylight__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.day-hours {
  padding: 5px;
  font-size: 26px;
}
.sunrise-time,
.sunset-time {
  padding: 5px;
  font-size: 18px;
}
</style>