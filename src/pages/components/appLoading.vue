<template>
  <div id="appLoading">
      <div :style="{'height':height,'width':width}">
          <mu-linear-progress :size="10" color="red" />
      </div>
  </div>
</template>

<script>
export default {
  name: "appLoading",
  props: {
    show: false
  },
  datas() {
    return {
      width: 640,
      height: 1024
    };
  },
  methods: {},
  watch: {
    show: function(v, ov) {
      if (v) {
      } else {
        setTimeout(() => {
          v = false;
        }, 1000);
      }
    }
  }
};
</script>

<style>

</style>
