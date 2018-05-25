<template>
    <div id="comUserInfo">
        <mu-avatar slot="left" :src="userInfo.avatar || defaultAvatar" :size="96" />
        <mu-card-title :title="userInfo.name || '企业微信昵称'" :subTitle="userInfo.english_name ||''">
        </mu-card-title>
        <mu-badge :content="userInfo.position||'员工'" primary slot="after" />
    </div>
</template>

<script>
export default {
  name: "comUserInfo",
  data() {
    return {};
    userInfo: null;
  },
  methods: {},
  created(){
      this.userInfo = this.$store.getters.getUserInfo;
  }
};
</script>

<style>
</style>
