<template>
    <div id="qrcodePage">
        <mu-flexbox justify="center">
            <mu-flexbox-item align='center'>
                <!-- 左侧用户信息 -->
                <com-user-info></com-user-info>
            </mu-flexbox-item>
            <mu-flexbox-item>
                <!-- 码数 -->
                {{qrcodeItems.length||0}}个
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
                <template slot="title">{{e.name}}</template>
                <mu-icon slot="left" value="inbox" />
                <template solt="right">
                    <img :src="e.qrcodeImg||null" alt="">
                </template>
            </mu-list-item>
        </mu-list>
    </div>
</template>

<script>
const comUserInfo = () => import("@/pages/qrcode/components/userInfo.vue");
import Qrcode from "qrcode";
export default {
  name: "qrcodePage",
  data() {
    return {
      qrcodeItems: []
    };
  },
  components: {
    "com-user-info": comUserInfo
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
      v.map((e, i) => {
        e.infoUrl = "http://wxoa.emking.cn/scan?id=" + e.unionid;
        Qrcode.toDataURL(
          "http://wxoa.emking.cn/scan?id=" + e.unionid,
          (err, url) => {
            e.qrcodeImg = url;
          }
        );
      });
      this.qrcodeItems = v;
    }
  }
};
</script>

<style>
</style>
