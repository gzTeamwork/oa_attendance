<template>
    <div id="bottomNav">
        <circle-menu class="bottom-nav" type="top" :number="4" animate="animated jello" mask='white' circle>
            <!-- <button type="button" slot="item_btn"></button> -->
            <mu-icon slot="item_btn" value="add"></mu-icon>
            <router-link v-for="(nav , i) in navs" :key="i" :to="nav.path" :slot="'item_'+i">
                <mu-icon slot="item_btn" value="add"></mu-icon> {{nav.title}}
            </router-link>
        </circle-menu>
    </div>
</template>

<script>
import CircleMenu from "vue-circle-menu";
export default {
  props: {
    navs: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  name: "bottomNav",
  components: {
    CircleMenu
  }
};
</script>

<style lang="scss" scoped>
#bottomNav {
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  bottom: 3%;
}
</style>
