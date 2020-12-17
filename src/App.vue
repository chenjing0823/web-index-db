<!--
 * @Author: jing.chen
 * @Date: 2020-12-17 13:51:28
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-12-17 13:55:32
 * @Description: 
-->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <indexDb/>
  </div>
</template>

<script>
import indexDb from './components/indexDb.vue'

export default {
  name: 'App',
  components: {
    indexDb
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
