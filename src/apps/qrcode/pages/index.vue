<template>
  <div id="qrcodePage">

    <!-- <mu-raised-button @click="openBottomSheet" label="Open Bottom Sheet" /> -->
    <!-- <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
      <mu-list @itemClick="closeBottomSheet">
        <mu-sub-header>
          码表
        </mu-sub-header>
        <com-print-codes :items="qrcodeItems"></com-print-codes>
      </mu-list>
    </mu-bottom-sheet> -->
    <mu-flexbox class="userInfo img-box" :style="{backgroundImage:'url('+require('./../assets/imgs/header_bg.png')+')'}">
      <mu-flexbox-item align="center" justify="center">
        <com-user-info :theme="'white'"></com-user-info>
      </mu-flexbox-item>
    </mu-flexbox>

    <mu-flexbox justify="center">
      <mu-flexbox-item>
        <!-- 码数 -->
        下辖二维码:{{qrcodeItems.length||0}}个
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox align='center'>
      <!-- 功能按钮区 -->
      <mu-flexbox-item grow="2">
        <mu-text-field hintText="浮动标签" labelFloat/>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <!-- 添加二维码 -->
        <mu-float-button icon="search" primary mini class="demo-float-button" />
        <mu-float-button icon="add" secondary mini class="demo-float-button" />
        <!-- <mu-raised-button label="添加物品二维码" labelPosition="before" icon="add" secondary/> -->
      </mu-flexbox-item>
    </mu-flexbox>

    <!-- 权属二维码记录区 -->
    <mu-list>
      <mu-list-item v-for="(e,i) in qrcodeItems" :key="i">
        <mu-icon slot="left" value="inbox" /> {{e.name}} - {{e.infoUrl}}
        <template solt="right">
          <img :src="e.qrcodeImg||null" alt="" style="width:64px">
          <mu-float-button icon="link" mini :to="e.infoUrl">
          </mu-float-button>
        </template>
      </mu-list-item>
    </mu-list>

  </div>
</template>

<script>
const comUserInfo = () => import("@/apps/public/userInfo.vue");
// const comPrintCodes = () => import("./printCodes.vue");
import Qrcode from "qrcode";
export default {
  name: "qrcodePage",
  data() {
    return {
      qrcodeItems: [],
      bottomSheet: false
    };
  },
  components: {
    "com-user-info": comUserInfo
    // "com-print-codes": comPrintCodes
  },
  created() {
    let vm = this;
    vm.$serverApi.getScanItems(20);
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
      this.qrcodeItems = v;
    }
  },
  methods: {
    closeBottomSheet() {
      this.bottomSheet = false;
    },
    openBottomSheet() {
      this.bottomSheet = true;
    }
  }
};
</script>
<style lang="scss" scoped>
#qrcodePage {
  .userInfo {
    box-shadow: 0 0 25px #6373f0;
  }
}
</style>

