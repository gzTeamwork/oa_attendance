<template>
  <div id="museLoading">
    <div v-if="show">
      <mu-circular-progress :size="90" />
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: "museLoading",
  props: {
    msg: ""
  },
  date() {
    return {
      show: false,
      timeOut: 1500,
      msg: ""
    };
  },
  methods: {
    showThis() {
      this.show = true;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.show = false;
      }, this.timeOut);
    },
    hideThis() {
      this.show = false;
      if (this.timer) clearTimeout(this.timer);
    }
  },
  watch: {
    msg: function(v, ov) {
      //   this.msg = v;
      this.showThis();
    }
  }
};
</script>

<style>

</style>
