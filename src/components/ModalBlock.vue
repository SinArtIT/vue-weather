<template>
  <div class="modal-block" @click.stop="hideModal">
    <div class="modal-block__wrapper" @click.stop>
      <h2 v-if="$store.state.isRegBlock">Регистрация</h2>
      <h2 v-if="!$store.state.isRegBlock">Авторизация</h2>

      <form
        v-if="!$store.state.isRegBlock"
        @submit.prevent="userAuth"
        class="modal-block__form"
      >
        <label for="input-mail" class="modal-block__label">Почта:</label>
        <input
          type="email"
          class="modal-block__input"
          id="input-mail"
          name="email"
        />
        <label for="input-password" class="modal-block__label">Пароль</label>
        <input
          type="password"
          class="modal-block__input"
          id="input-password"
          name="password"
        />
        <button type="submit" class="modal-block__button">Ок</button>
      </form>
      <form
        v-if="$store.state.isRegBlock"
        @submit.prevent="userReg"
        class="modal-block__form"
      >
        <label for="input-name" class="modal-block__label">Имя:</label>
        <input
          type="text"
          class="modal-block__input"
          id="input-name"
          name="name"
        />
        <label for="input-mail" class="modal-block__label">Почта:</label>
        <input
          type="email"
          class="modal-block__input"
          id="input-mail"
          name="email"
        />
        <label for="input-password" class="modal-block__label">Пароль</label>
        <input
          type="password"
          class="modal-block__input"
          id="input-password"
          name="password"
        />
        <button type="submit" class="modal-block__button">Ок</button>
      </form>
      <div v-if="isSuccess" class="modal-block__success-block">
        <span v-if="$store.state.isRegBlock">Вы успешно зарегистрированы</span>
        <span v-if="!$store.state.isRegBlock">Вы успешно авторизированы</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isSuccess: false,
    };
  },
  methods: {
    ...mapActions({
      // userAuth: "userAuth",
      userRegistration: "userRegistration",
      userAuthorization: "userAuthorization",
      getCitiesList: "getCitiesList",
      fetchFavorites: "fetchFavorites",
    }),
    userReg: function (e) {
      this.userRegistration(new FormData(e.target)).then(() => {
        this.isSuccess = this.$store.state.success;
      });
    },
    userAuth: function (e) {
      this.userAuthorization(new FormData(e.target)).then(() => {
        this.isSuccess = this.$store.state.success;
        this.getCitiesList();
        this.fetchFavorites();
      });
    },
    hideModal() {
      this.$store.commit("setIsModal", false);
      this.isSuccess = false;
    },
  },
};
</script>
<style scoped>
.modal-block {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.5);
}
.modal-block__wrapper {
  padding: 20px;
  background: #fff;
  width: 400px;
  height: 500px;
}
.modal-block__form {
  display: flex;
  flex-direction: column;
}
.modal-block__input {
  padding: 5px;
}
.modal-block__label {
  padding: 10px 0;
}
.modal-block__button {
  background-color: transparent;
  border: 1px solid rgb(87, 171, 188);
  margin: 10px 0;
  padding: 5px 20px;
  align-self: flex-end;
}
.modal-block__button:hover {
  cursor: pointer;
  background-color: rgb(87, 171, 188);
  color: #fff;
}
</style>