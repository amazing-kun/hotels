<template>
  <div id="app">
    <el-button type="danger">危险按钮</el-button>
    <!--img src="./assets/logo.png"-->
    <router-view/>
  </div>
</template>

<script>
import test1 from './views/test/test1'
export default {
  name: 'App',
  components: {
    test1
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
