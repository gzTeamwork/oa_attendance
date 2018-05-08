<template>
  <div id="appBar">
     <router-view></router-view>
      <mu-bottom-nav :value="curAppBar" @change="handleChange">
      <mu-bottom-nav-item v-for="item in appBars" :key="item.path" :value="item.path" 
      :title="item.title" :icon="item.icon" :to="item.path" activeClass="appBar-active"/>
    </mu-bottom-nav>    
  </div>
</template>

<script>
let appBars = [
  { title: "排班", path: "schedule", icon: "today" },
  { title: "排休", path: "userRest", icon: "face" },
  { title: "报餐", path: "dailyMeal", icon: "local_dining" }
];
export default {
  name: "appBar",
  data() {
    return {
      appBars: appBars,
      curAppBar: appBars[0].path
    };
  },
  methods: {
    handleChange: function(val) {
      if (this.userInfo === null) {
        alert("请先授权登录");
        return false;
      } else {
        this.curAppBar = val;
      }
    }
  }
};
</script>

<style>
#appBar {
  height: 100%;
  padding-bottom: 6em;
}
#appBar .mu-bottom-nav {
  position: fixed;
  bottom: 0;
}
#appBar .appBar-active {
  color: slateblue !important;
}
</style>
