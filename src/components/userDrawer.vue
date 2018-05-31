<template>
  <div id="userDrawer">
    <mu-float-button class="userDrawerBtn" :icon="this.open?'arrow_forward':'menu'" label="toggle drawer" @click="toggle()" />
    <mu-drawer :docked="true" right :open="open" @close="toggle()">
      <!-- <mu-appbar title="Inforward OA" /> -->
      <mu-avatar :src="userInfo.avatar || defaultAvatar" :size="50" style="margin-top:1em;" />
      <mu-card-title :title="userInfo.name || '企业微信昵称'" :subTitle="userInfo.english_name ||''">
      </mu-card-title>
      <mu-badge :content="userInfo.position||'员工'" primary />
      <mu-list>
        <!-- 列表 -->
        <mu-list-item v-for="(nav,i) in navs" :key="i" :to="nav.path" @click="toggle()" :class="currentPath.match(nav.path)?'active':''">
          <div slot="left">
            <mu-icon slot="left" :value="nav.icon" />
          </div>
          <div slot="title" style="text-align: left;">
            {{nav.title}}
          </div>
        </mu-list-item>
        <!-- 关闭按钮 -->
        <mu-list-item @click.native="open = false" title="关闭" />
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
// 用户信息侧栏

export default {
  name: "userDrawer",
  props: {
    isOpen: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    navs: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      open: false,
      currentPath: null
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  },
  created() {
    this.userInfo = this.$store.getters.getUserInfo;
    this.currentPath = this.$route.path;
  },
  computed: {
    handlerUserInfoChange: function() {
      return this.$store.getters.getUserInfo;
    },
    handlerRouterChange: function() {
      return this.$route.path;
    }
  },
  watch: {
    handlerUserInfoChange: function(v) {
      this.userInfo = v;
    },
    handlerRouterChange: function(v) {
      this.currentPath = v;
    },
    "props.isOpen": function(v) {
      this.open = v;
    }
  }
};
</script>
<style lang="scss" scoped>
#userDrawer {
  .userDrawerBtn {
    position: fixed;
    z-index: 3000;
    right: 3%;
    bottom: 3%;
  }
  .active {
    background: #333;
    & * {
      color: white;
    }
  }
}
</style>
