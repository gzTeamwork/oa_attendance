
<template>
  <div id="itemInfoPage">
    <div v-for="(e,i) in itemInfo" :key="i">
      <div v-if="i != 'qrcode'">{{e}}</div>
      <img v-if="i == 'qrcode'" :src="e" alt="" />
    </div>
  </div>
</template>

<script>
import Qrcode from "qrcode";
export default {
  name: "itemInfopage",
  data() {
    return {
      itemId: null,
      itemInfo: null
    };
  },
  components: {
    Qrcode
  },
  created() {
    let vm = this;
    //  实例化之后,则是根据id向服务器发起询问

    //  1.获取查询参数
    let itemId = vm.$route.query.union_id || null;
    this.itemId = itemId;
    if (itemId == null) {
    } else {
      vm.$serverApi.getItemInfoByScan(itemId);
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
      vm.itemInfo = v;
      let itemUrl = "http://wxoa.emking.cn/scan?union_id=" + v.unionid;
      Qrcode.toDataURL(itemUrl, (err, url) => {
        vm.itemInfo.qrcode = url;
      });
    }
  }
};
</script>

<style>
</style>
