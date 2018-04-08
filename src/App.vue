/* * @Author: Zicokuo * @Date: 2018-04-06 10:06:10 * @Last Modified by: Zicokuo * @Last Modified time: 2018-04-06 10:06:10
*/
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import helper from '@/libs/helper.js';
  import eventBus from '@/libs/eventBus.js';
  import serverApi from '@/libs/serverApi.js';
  export default {
    name: "App",
    created: function () {
      let vm = this;
       
    }
  };

</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
