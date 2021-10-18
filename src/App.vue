<template>
  <div id="app">
    <erc20/>
  </div>
</template>

<script>
import erc20 from './components/erc20.vue'

export default {
  name: 'app',
  components: {
    erc20
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
