<template>
  <CounterOffensive />
</template>

<script>
import CounterOffensive from './components/CounterOffensive.vue';

export default {
  name: 'App',
  components: {
    CounterOffensive,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  margin: 0;
}

body {
  margin: 0;
}

* {
  box-sizing: border-box;
}
</style>
