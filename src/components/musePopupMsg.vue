<template>
<div id="musePopupMsg">
<mu-popup position="top" popupClass="demo-popup-bottom" :open="popup" :overlay="false">
    <!-- <mu-appbar title="弹出">
      <mu-flat-button slot="right" label="关闭" color="white" @click="close"/>
    </mu-appbar> -->
    <mu-content-block>
      {{msg}}
    </mu-content-block>
  </mu-popup>
</div>
</template>

<script>
export default {
  name: "musePopupMsg",
  props: {
    msg: ""
  },
  data() {
    return {
      popup: false,
      timeHandle: null
    };
  },
  methods: {
    open(event) {
      this.popup = true;
    },
    close(event) {
      this.popup = false;
    }
  },
  watch: {
    msg: function(v, ov) {
      if (v) {
        this.popup = true;
        this.timeHandle = setTimeout(() => {
          this.popup = false;
          v = null;
        }, 1000);
      }
    }
  }
};
</script>

<style>

</style>
