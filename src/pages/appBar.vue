<template>
  <div id="appBar">
    <router-view></router-view>
    <com-user-drawer :navs="appBars"></com-user-drawer>
    <!-- <mu-bottom-nav :value="curAppBar" @change="handleChange">
      <mu-bottom-nav-item v-for="item in appBars" :key="item.path" :value="item.path" :title="item.title" :icon="item.icon" :to="item.path" activeClass="appBar-active" />
    </mu-bottom-nav> -->
  </div>
</template>

<script>
let appBars = [
  { title: "排班", path: "schedule", icon: "today" },
  { title: "调休", path: "userRest", icon: "face" },
  { title: "报餐", path: "dailyMeal", icon: "local_dining" },
  { title: "二维码", path: "qrcode", icon: "center_focus_strong" },
  { title: "我", path: "myInfo", icon: "people" }
];

import comUserDrawer from "@/components/userDrawer.vue";

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
  },
  components: {
    "com-user-drawer": comUserDrawer
  }
};
</script>

<style lang="scss">
#appBar {
  height: 100%;
  padding-bottom: 6em;
  & .mu-bottom-nav {
    position: fixed;
    bottom: 0;
  }
  & .appBar-active {
    color: slateblue !important;
  }
  & .mu-appbar {
    position: fixed;
    z-index: 1200;
  }
  & .mu-appbar + div {
    padding-top: 5em;
  }
}
</style>
