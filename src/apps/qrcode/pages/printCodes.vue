<template>
  <div id="printCodes">
    <mu-flexbox wrap="wrap">
      <mu-flexbox-item v-for="(e,i) in items" :key="i" :basis="'30%'" shrink="0" align="center" justify="" wrap="wrap" style="padding:2em 0;">
        <img :src="e.qrcodeImg" alt="" />
        <div>码号:{{pad(e.id,14)}}</div>
        <div>{{e.title||'暂无'}}</div>
        <div>唯一码:{{e.unionid}}</div>
      </mu-flexbox-item>
    </mu-flexbox>

  </div>
</template>

<script>
import Qrcode from "qrcode";
import CodeApi from "./../components/api.js";
// import comPageHead from "./../../public/pageHead";

export default {
  name: "printCodes",
  // props: {
  //   items: {
  //     type: Array,
  //     default: () => {
  //       return [];
  //     }
  //   }
  // },
  data() {
    return {
      items: []
    };
  },
  methods: {
    pad: function(n, num) {
      return window.Helper.stringer.getPadFill(n, num);
    }
  },
  created() {
    let vm = this;
    CodeApi.getScanItems(90);
  },
  computed: {
    handerQrcodeItemsChange: function() {
      return this.$store.getters.getQrcodeItems;
    }
  },
  watch: {
    handerQrcodeItemsChange: function(v) {
      // let hostUrl = process.env.NODE_ENV === 'development'?''
      v.map((e, i) => {
        e.infoUrl = "/scan?union_id=" + e.unionid;
        Qrcode.toDataURL(
          "http://wxoa.emking.cn/scan?union_id=" + e.unionid,
          (err, url) => {
            e.qrcodeImg = url;
          }
        );
      });
      this.items = v;
    }
  },
  components: {
    // "com-page-head": comPageHead
  }
};
</script>

<style>
</style>
