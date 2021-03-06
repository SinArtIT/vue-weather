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

    favorites–°itiesList: [],

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
      return state.citiesWeatherList.filter(item => state.favorites–°itiesList.map(element => element.id).includes(item.server_id))
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
    setFavorites–°itiesList(state, newValue) {
      state.favorites–°itiesList = newValue;
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
      commit('setFavorite–°ities', [...state.favorite–°ities, id]);
    },

    // –∑–į–Ņ—Ä–ĺ—Ā –Ņ–ĺ API
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
    //–Ņ—Ä–Ķ–ĺ–Ī—Ä–į–∑–ĺ–≤–į–Ĺ–ł–Ķ –≥—Ä–į–ī—É—Ā–ĺ–≤ –≤ –Ĺ–į–Ņ—Ä–į–≤–Ľ–Ķ–Ĺ–ł–Ķ –≤–Ķ—ā—Ä–į –Ņ–ĺ –Ņ–ĺ–Ľ—é—Ā–į–ľ
    getWindSide({ state }, deg) {
      state.url;
      return new Promise((resolve) => {
        let side = '';

        switch (true) {
          case (deg > 345):
            side = '–í';
            break;
          case (deg < 15):
            side = '–í';
            break;
          case (deg >= 15 && deg <= 75):
            side = '–°–í';
            break;
          case (deg > 75 && deg < 105):
            side = 'C';
            break;
          case (deg >= 105 && deg <= 165):
            side = 'C–ó';
            break;
          case (deg > 165 && deg < 195):
            side = '–ó';
            break;
          case (deg >= 195 && deg <= 255):
            side = '–ģ–ó';
            break;
          case (deg > 255 && deg < 285):
            side = '–ģ';
            break;
          case (deg >= 285 && deg <= 345):
            side = '–ģ–ó';
            break;
        }

        resolve(side);
      })
    },
    //–Ĺ–į–∑–Ĺ–į—á–Ķ–Ĺ–ł–Ķ –ļ–ĺ–ĺ—Ä–ī–ł–Ĺ–į—ā —Ā–ĺ–≥–Ľ–į—Ā–Ĺ–ĺ –≥–Ķ–ĺ–Ľ–ĺ–ļ–į—Ü–ł–ł
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
    //–ł–∑–ľ–Ķ–Ĺ–Ķ–Ĺ–ł–Ķ –ī–į—ā—č –ł –≤—Ä–Ķ–ľ—Ź
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
            dayName = '–í—Ā';
            break;
          case (day == 1):
            dayName = '–ü–Ĺ';
            break;
          case (day == 2):
            dayName = '–í—ā';
            break;
          case (day == 3):
            dayName = '–°—Ä';
            break;
          case (day == 4):
            dayName = '–ß—ā';
            break;
          case (day == 5):
            dayName = '–ü—ā';
            break;
          case (day == 6):
            dayName = '–°–Ī';
            break;
        }

        return dayName;
      }
    },
    //–ĺ—ā–Ņ—Ä–į–≤–ļ–į –Ĺ–į —Ā–Ķ—Ä–≤–Ķ—Ä –ī–į–Ĺ–Ĺ—č—Ö –ī–Ľ—Ź —Ä–Ķ–≥–ł—Ā—ā—Ä–į—Ü–ł–ł
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
    //–ĺ—ā–Ņ—Ä–į–≤–ļ–į –Ĺ–į —Ā–Ķ—Ä–≤–Ķ—Ä –ī–į–Ĺ–Ĺ—č—Ö –ī–Ľ—Ź –į–≤—ā–ĺ—Ä–ł–∑–į—Ü–ł–ł
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
    //–ĺ—ā–Ņ—Ä–į–≤–ļ–į –Ĺ–į —Ā–Ķ—Ä–≤–Ķ—Ä –∑–į–Ņ—Ä–ĺ—Ā –Ĺ–į —Ā–Ņ–ł—Ā–ĺ–ļ –≥–ĺ—Ä–ĺ–ī–ĺ–≤, –ĺ—ā–≤–Ķ—ā –≤ –≤–ł–ī–Ķ –ī–į–Ĺ–Ĺ—č—Ö –ĺ –Ņ–ĺ–≥–ĺ–ī–Ķ –≤–ĺ –≤—Ā–Ķ—Ö –≥–ĺ—Ä–ĺ–ī–į—Ö
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
            commit('setFavorites–°itiesList', response.data.data);
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
        .then(() => commit('setFavorites–°itiesList', state.favorites–°itiesList.filter(item => item.id != id)))
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
      centrifuge.subscribe("Šł®eŇüńĀr-e Sefńęd", callbacks);
      centrifuge.subscribe("userChannel#41", callbacks);

      //"Šł®eŇüńĀr-e Sefńęd", 41

      centrifuge.connect();
    }
  }
})