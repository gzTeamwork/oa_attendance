
<template>
  <div id="pageScanItem">
    <div v-for="(e,i) in info" :key="i">
      <div v-if="i != 'qrcode'">{{e}}</div>
      <img v-if="i == 'qrcode'" :src="e" alt="" />
    </div>
  </div>
</template>

<script>
//  引入二维码生成器
import Qrcode from "qrcode";

export default {
  name: "pageScanItem",
  data() {
    return {
      union_id: null,
      info: null
    };
  },
  components: {
    Qrcode
  },
  created() {
    let vm = this;
    //  根据扫码的union_id向服务器发起查询
    let union_id = vm.$route.query.union_id || null;
    this.union_id = union_id;
    if (union_id == null) {
    } else {
      vm.$serverApi.getItemInfoByScan(union_id);
    }
  },
  computed: {
    handerScanItemInfoChange: function() {
      return this.$store.getters.getItemInfo;
    }
  },
  watch: {
    handerScanItemInfoChange: function(v) {
      let vm = this;
      vm.info = v;
      let itemUrl = "http://wxoa.emking.cn/scan?union_id=" + v.unionid;
      Qrcode.toDataURL(itemUrl, (err, url) => {
        vm.info.qrcode = url;
      });
    }
  }
};
</script>

<style>
</style>
