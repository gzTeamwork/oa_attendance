<template>
    <div id="comUserInfo" :class="theme">
        <div style=" position: absolute;top: 50%;">
            <mu-avatar slot="left" :src="userInfo.avatar || defaultAvatar" :size="96" />
            <div class="title">
                {{userInfo.name || "用户昵称"}}
            </div>
            <div class="title">
                {{userInfo.department||"员工"}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "comUserInfo",
  props: {
    theme: {
      type: String,
      default: () => {
        return "black";
      }
    }
  },
  data() {
    return {};
    userInfo: null;
  },
  methods: {},
  created() {
    this.userInfo = this.$store.getters.getUserInfo;
  }
};
</script>
<style lang="scss">
$white: #ffffff;
$black: #333333;
#comUserInfo {
  min-height: 240px;
  max-height: 330px;
  height: 33%;
  & .title {
    font-size: 20px;
    line-height: 1.3;
    text-align: center;
  }
  &.black {
    & .title {
      color: $black;
    }
  }
  &.white {
    & .title {
      color: $white;
    }
  }
}
</style>

