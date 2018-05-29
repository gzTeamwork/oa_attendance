<template>
  <div id="comUserInfo">
    <div :class="'userInfo ' + theme">
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
<style lang="scss" scoped>
$white: #ffffff;
$black: #333333;
.userInfo {
  height: 240px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & .title {
    font-size: 20px;
    line-height: 1.3;
    text-align: center;
    line-height: 2em;
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

