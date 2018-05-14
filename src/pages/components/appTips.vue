<template>
  <div id="appTips">
      <mu-snackbar v-if="show" action="OK" :message="msg"  @actionClick="hideSnackbar" @close="hideSnackbar"/>
  </div>
</template>

<script>
export default {
  name: "appTips",
  data() {
    return {
      show: false,
      msg: null,
      timer: null
    };
  },
  methods: {
    showSnackbar: function() {
      this.show = true;
    },
    hideSnackbar: function() {
      this.show = false;
    }
  },
  watch: {
    handlerAppMsgChange: function(v, ov) {
      console.log("监听系统信息变更为" + v);
      let vm = this;
      if (vm.show) {
        clearTimeout(vm.timer);
      }
      vm.show = true;
      vm.msg = v;
      vm.timer = setTimeout(() => {
        vm.hideSnackbar();
      }, 2000);
    }
  },
  computed: {
    handlerAppMsgChange: function() {
      return this.$store.getters.getAppMsg;
    }
  }
};
</script>

<style>

</style>
