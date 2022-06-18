import axios from "axios";
import { createStore } from "vuex";

let Centrifuge = require("centrifuge");

export default createStore({
  state: () => ({
    appiId: '796e8b6cbbc555268110cd6adb827344',
    geoLat: 0,
    geoLon: 0,
    lang: 'ru',
    units: 'metric',
    urlDay: 'https://api.openweathermap.org/data/2.5/weather',
    urlWeek: 'https://api.openweathermap.org/data/2.5/onecall',
    apiUrl: 'https://front-test.academy.smartworld.team/api',
    exclude: 'minutely,hourly,alerts',

    dayData: {},
    weekData: {},

    curCityData: {},
    curWeekData: {},

    user: {
      email: '',
      authToken: '',
      socketToken: '',
    },

    isLoading: true,
    userIsAuth: false,

    date: {
      dayName: '',
      day: 0,
      month: 0,
      hour: 0,
      minutes: '00',
    },

    citiesList: [],
    citiesWeatherList: [],

    favoritesСitiesList: [],

    isNotification: false,
    isAddBlock: true,
    isModal: false,
    isRegBlock: false,
    success: false,
  }),
  getters: {
    getCityWeather: (state) => (value) => {
      return state.citiesWeatherList.filter(item => item.id == value)
    },
    getFavoritesCitiesList: (state) => {
      return state.citiesWeatherList.filter(item => state.favoritesСitiesList.map(element => element.id).includes(item.server_id))
    },
  },
  mutations: {
    setGeoLon(state, newValue) {
      state.geoLon = newValue;
    },
    setGeoLat(state, newValue) {
      state.geoLat = newValue;
    },
    setDayData(state, newValue) {
      state.dayData = newValue;
    },
    setWeekData(state, newValue) {
      state.weekData = newValue;
    },
    setDate(state, newValue) {
      state.date = newValue;
    },
    setIsModal(state, newValue) {
      state.isModal = newValue;
    },
    setIsRegBlock(state, newValue) {
      state.isRegBlock = newValue;
    },
    setSuccess(state, newValue) {
      state.success = newValue;
    },
    setUser(state, newValue) {
      state.user = newValue;
    },
    setUserIsAuth(state, newValue) {
      state.userIsAuth = newValue;
    },
    setFavoritesСitiesList(state, newValue) {
      state.favoritesСitiesList = newValue;
    },
    setCitiesList(state, newValue) {
      state.citiesList = newValue;
    },
    pushCitiesWeatherList(state, newValue) {
      state.citiesWeatherList.push(newValue);
    },
    setAttrSide(state, newValue) {
      state.dayData.wind.side = newValue;
    },
    setIsLoading(state, newValue) {
      state.isLoading = newValue;
    },
    setCurCityData(state, newValue) {
      state.curCityData = newValue;
    },
    setCurWeekData(state, newValue) {
      state.curWeekData = newValue;
    },
    setIsNotification(state, newValue) {
      state.isNotification = newValue;
    },
    setIsAddBlock(state, newValue) {
      state.isAddBlock = newValue;
    },
    setCitiesWeatherList(state, newValue) {
      state.citiesWeatherList = newValue;
    }
  },
  actions: {
    addNewCity({ state, commit }, id) {
      commit('setFavoriteСities', [...state.favoriteСities, id]);
    },

    // запрос по API
    async fetchWeather({ state, commit, dispatch }, payload) {
      let url = payload[1];
      let setter = payload[0];
      let params = {};

      commit('setIsLoading', true);

      if (!payload[2] && !payload[3]) {
        params = {
          lat: state.geoLat,
          lon: state.geoLon,
          lang: state.lang,
          units: state.units,
          exclude: state.exclude,
          appid: state.appiId,
        };
      } else {
        params = {
          lat: payload[2],
          lon: payload[3],
          lang: state.lang,
          units: state.units,
          exclude: state.exclude,
          appid: state.appiId,
        };
      }
      await axios.get(url, {
        params: params
      })
        .then((data) => {
          if (setter == 'setDayData') {
            dispatch('getWindSide', data.data.wind.deg).then(windSide => {
              data.data.wind['side'] = windSide;
              commit(setter, data.data);
              commit('setIsLoading', false);
            });
          } else {
            commit(setter, data.data);
            commit('setIsLoading', false);
          }

        })
    },
    //преобразование градусов в направление ветра по полюсам
    getWindSide({ state }, deg) {
      state.url;
      return new Promise((resolve) => {
        let side = '';

        switch (true) {
          case (deg > 345):
            side = 'В';
            break;
          case (deg < 15):
            side = 'В';
            break;
          case (deg >= 15 && deg <= 75):
            side = 'СВ';
            break;
          case (deg > 75 && deg < 105):
            side = 'C';
            break;
          case (deg >= 105 && deg <= 165):
            side = 'CЗ';
            break;
          case (deg > 165 && deg < 195):
            side = 'З';
            break;
          case (deg >= 195 && deg <= 255):
            side = 'ЮЗ';
            break;
          case (deg > 255 && deg < 285):
            side = 'Ю';
            break;
          case (deg >= 285 && deg <= 345):
            side = 'ЮЗ';
            break;
        }

        resolve(side);
      })
    },
    //назначение координат согласно геолокации
    getCoordinations({ commit }) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(success);

        function success(pos) {
          const crd = pos.coords;

          commit('setGeoLon', crd.longitude);
          commit('setGeoLat', crd.latitude);

          resolve(true);
        }
      })
    },
    //изменение даты и время
    setDate({ commit }, param) {
      let date = param ? new Date(param * 1000) : new Date();
      let curDate = {
        dayName: getDayName(date.getDay()),
        day: date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
        month: date.getMonth() + 1 > 9 ? date.getMonth() : '0' + date.getMonth(),
        hour: date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
        minutes: '00',
      }

      if (!param) commit('setDate', curDate)
      else {
        return curDate;
      }

      function getDayName(day) {
        let dayName = '';

        switch (true) {
          case (day == 0):
            dayName = 'Вс';
            break;
          case (day == 1):
            dayName = 'Пн';
            break;
          case (day == 2):
            dayName = 'Вт';
            break;
          case (day == 3):
            dayName = 'Ср';
            break;
          case (day == 4):
            dayName = 'Чт';
            break;
          case (day == 5):
            dayName = 'Пт';
            break;
          case (day == 6):
            dayName = 'Сб';
            break;
        }

        return dayName;
      }
    },
    //отправка на сервер данных для регистрации
    async userRegistration({ state, commit }, body) {
      commit('setIsLoading', true);
      await axios.post(`${state.apiUrl}/api/register`, {
        name: body.get('name'),
        email: body.get('email'),
        password: body.get('password')
      })
        .then(() => {
          commit('setSuccess', true);
          commit('setIsLoading', false);
        })
        .catch(() => {
          commit('setSuccess', false);
          commit('setIsLoading', false);
        })
    },
    //отправка на сервер данных для авторизации
    async userAuthorization({ state, commit }, body) {
      commit('setIsLoading', true);
      await axios.post(`${state.apiUrl}/api/login`, {
        email: body.get('email'),
        password: body.get('password')
      })
        .then(response => {
          commit('setSuccess', true);
          commit('setUser', { email: body.get('email'), authToken: response.data.data.authToken.token, socketToken: response.data.socketToken });
          commit('setUserIsAuth', true);
          commit('setIsLoading', false);
        })
        .catch(() => {
          commit('setSuccess', false);
          commit('setIsLoading', false);
        })
    },
    //отправка на сервер запрос на список городов, ответ в виде данных о погоде во всех городах
    getCitiesList({ state, commit, dispatch }) {
      commit('setIsLoading', true);
      axios.get(`${state.apiUrl}/City/get`, {
        headers: { 'Authorization': `Bearer ${state.user.authToken}` }
      })
        .then(responce => {
          responce.data.data.forEach(item => {
            axios.get(`${state.urlDay}`,
              {
                params: {
                  lang: state.lang,
                  units: state.units,
                  id: item.api_city_id,
                  appid: state.appiId,
                }
              })
              .then(data => {
                dispatch('getWindSide', data.data.wind.deg).then(windSide => {
                  data.data['server_id'] = item.id;
                  data.data.wind['side'] = windSide;
                  commit('pushCitiesWeatherList', data.data)
                  commit('setIsLoading', false);
                })

              });
          });
        })
    },
    fetchFavorites({ state, commit }) {
      console.log('fetch');
      return new Promise(resolve => {
        axios.get(`${state.apiUrl}/City/getFavourite`,
          {
            headers: { 'Authorization': `Bearer ${state.user.authToken}` }
          })
          .then((response) => {
            commit('setFavoritesСitiesList', response.data.data);
            resolve(true)
          })
      });
    },
    addFavorite({ state }, id) {
      console.log('add');
      axios.post(`${state.apiUrl}/City/add/${id}`, {},
        {
          headers: { 'Authorization': `Bearer ${state.user.authToken}` }
        })
    },
    removeFavorite({ state, commit }, id) {
      axios.delete(`${state.apiUrl}/City/remove/${id}`,
        {
          headers: { 'Authorization': `Bearer ${state.user.authToken}` }
        })
        .then(() => commit('setFavoritesСitiesList', state.favoritesСitiesList.filter(item => item.id != id)))
    },
    fetchSocket({ state }) {
      let callbacks = {
        "publish": function (message) {
          // See below description of message format
          console.log(message);
        },
        "join": function (message) {
          // See below description of join message format
          console.log(message);
        },
        "leave": function (message) {
          // See below description of leave message format
          console.log(message);
        },
        "subscribe": function (context) {
          // See below description of subscribe callback context format
          console.log(context);
        },
        "error": function (errContext) {
          // See below description of subscribe error callback context format
          console.log(errContext);
        },
        "unsubscribe": function (context) {
          // See below description of unsubscribe event callback context format
          console.log(context);
        }
      }
      // let folder = '/api/login';

      let centrifuge = new Centrifuge(`wss://front-test.academy.smartworld.team/connection/websocket`);

      centrifuge.setToken(state.user.socketToken);
      centrifuge.subscribe("Ḩeşār-e Sefīd", callbacks);
      centrifuge.subscribe("userChannel#41", callbacks);

      //"Ḩeşār-e Sefīd", 41

      centrifuge.connect();
    }
  }
})