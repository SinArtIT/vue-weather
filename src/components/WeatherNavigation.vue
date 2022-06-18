<template>
  <nav class="navigation">
    <ul class="navigation__items">
      <li class="navigation__item">
        <router-link to="/" class="navigation__link"> Главная </router-link>
      </li>
      <li class="navigation__item">
        <router-link to="/week" class="navigation__link">
          Прогноз на 10 дней
        </router-link>
      </li>
      <li class="navigation__item">
        <router-link class="navigation__link" to="/month">
          Прогноз на месяц
        </router-link>
      </li>

      <li class="navigation__item">
        <router-link class="navigation__link" to="/cities">
          Города региона
        </router-link>
      </li>
      <li class="navigation__item">
        <router-link
          v-show="$store.state.userIsAuth"
          class="navigation__link"
          to="/favorites"
        >
          Избранное
        </router-link>
      </li>
      <li class="navigation__item-user">
        <button class="user-button user-login" @click="showAuthBlock">
          Авторизация
        </button>
        <button class="user-button user-login" @click="showRegBlock">
          Регистрация
        </button>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  methods: {
    showRegBlock() {
      this.$store.commit("setIsModal", true);
      this.$store.commit("setIsRegBlock", true);
    },
    showAuthBlock() {
      this.$store.commit("setIsModal", true);
      this.$store.commit("setIsRegBlock", false);
    },
  },
};
</script>
<style scoped>
.navigation {
  background-color: #E6854C;
}
.navigation__items {
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr) 2fr;
  align-items: center;
}
.navigation__link {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  color: rgb(255, 255, 255);
}
.navigation__item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  cursor: pointer;

  transition: 0.4s ease;
}
.navigation__item:hover {
  color: black;
  background-color: #381f11;
}
.navigation__item-user {
  height: 100%;
  display: flex;
  justify-content: center;
}
.user-button {
  width: 50%;
  height: 100%;
  background-color: transparent;
  border: none;
  color: #fff;

  transition: 0.4s ease;

  font-size: 16px;
}
.user-button:hover {
  cursor: pointer;
  background-color: #381f11;
}
</style>