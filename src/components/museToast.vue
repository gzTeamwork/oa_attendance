/*
 * @Author: Zicokuo 
 * @Date: 2018-04-06 10:02:39 
 * @Last Modified by: Zicokuo
 * @Last Modified time: 2018-04-15 13:56:16
 */
<template>
  <div id="museToast">
    <mu-toast v-if="show"
              :message="msg"
              @close="hideToast" />
  </div>
</template>
<script>
export default {
  name: "museToast",
  props: {
    msg: ""
  },
  data() {
    return {
      show: false,
      timer: ""
    };
  },
  methods: {
    showToast() {
      this.show = true;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.show = false;
      }, 2000);
    },
    hideToast() {
      this.show = false;
      if (this.timer) clearTimeout(this.timer);
    }
  },
  watch: {
    "msg": function(v, ov) {
    //   this.msg = v;
      this.showToast();
    }
  }
};
</script>
<style scoped>

</style>

