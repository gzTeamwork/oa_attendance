/* * @Author: Zicokuo * @Date: 2018-04-06 10:06:10 * @Last Modified by: Zicokuo * @Last Modified time: 2018-04-06 10:06:10
*/
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import EventBus from "@/libs/eventBus.js";
export default {
  name: "App",
  beforeCreate: function() {
    let vm = this;
    //  向服务器连接拿appToken
    // let appToken = vm.$serverApi.getAppToken();
    // EventBus.$emit("appToken", appToken);
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
