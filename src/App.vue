<template>
  <div id="app">
    <header class="enclose-float">
      <img src="./assets/logo.png">
    </header>
    <router-view/>
    <footer class="text-center">
      Copyright Reserved
    </footer>
  </div>
</template>

<script>
import './assets/css/main.css'
import 'element-ui/lib/theme-chalk/index.css' // element-ui component styles

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
header img {
  width: 40px;
  height: auto;
  float: left;
  margin-left: 20px;
}
footer {
  margin-top: 40px;
}
</style>
