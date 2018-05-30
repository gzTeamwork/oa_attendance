<template>
    <div id="qrcodeNewItem">
        <mu-sub-header>
            {{title}}
        </mu-sub-header>
        <template v-if="mode == 'list'">
            <mu-list-item v-for="(e,i) in lists" :key="i">
                <template slot="title">{{e.label||'标签'}}</template>
            </mu-list-item>
        </template>
        <template v-if="mode == 'form'">
            <mu-list-item v-for="(e,i) in lists" :key="i">

            </mu-list-item>
        </template>
    </div>
</template>

<script>
export default {
  name: "qrcodeNewItem",
  props: {
    lists: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: {
      type: String,
      default: () => {
        return "标题";
      }
    },
    mode: {
      type: String,
      default: () => {
        return "list";
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
