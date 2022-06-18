<template>
  <div class="notification-block">
    <slot></slot>
  </div>
</template>
<script>
export default {
  created() {
    setTimeout(() => {
      this.$store.commit("setIsNotification", false);
    }, 3000);
  },
};
</script>
<style scoped>
.notification-block {
  width: 300px;
  padding: 20px 40px;
  color: transparent;
  background-color: transparent;
  border: none;
  position: fixed;
  left: calc(50% - 150px);
  text-align: center;

  transition: 0.5s ease;
  transform: translateY(-300px);

  animation-duration: 3s;
  animation-name: showblock;
}

@keyframes showblock {
  30% {
    transform: translateY(150px);
    color: darkgreen;
    background-color: rgb(207, 226, 254);
    border: 1px solid rgb(0, 40, 60);
  }
  70% {
    transform: translateY(150px);
    color: darkgreen;
    background-color: rgb(207, 226, 254);
    border: 1px solid rgb(0, 40, 60);
  }
  100% {
    transform: translateY(-300px);
    color: transparent;
    background-color: transparent;
    border: none;
  }
}
</style>