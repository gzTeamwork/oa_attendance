<template>
  <div id="pageHead">
    <mu-paper class="round-head" circle :zDepth="2">
      <mu-flexbox>
        <mu-flexbox-item align="center" justify="center">
          <mu-icon v-if="icon" :value="icon"></mu-icon>
          <div>{{title}}</div>
        </mu-flexbox-item>
      </mu-flexbox>
    </mu-paper>
  </div>
</template>

<script>
export default {
  name: "pageHead",
  props: {
    title: {
      type: String,
      default: () => {
        return null;
      }
    },
    icon: {
      type: String,
      default: () => {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#pageHead {
  position: fixed;
  top: 0;
  height: 100px;
  z-index: 3000;
  & .round-head {
    width: 100px;
    height: 100px;
    background: linear-gradient(#333, #666);
    color: white;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.7em auto;
    animation: toSmall 1s 1s 1 forwards ease-out;
    left: 0;
    right: 0;
    position: fixed;
    transition: all 2s;
  }
  @keyframes toSmall {
    0% {
      width: 128px;
      height: 128px;
      border-radius: 100%;
    }
    100% {
      width: 64px;
      height: 64px;
      left: 10px;
      transform: translateX(calc(50vw - 50% - 1em));
      border-radius: 100% 15% 100% 100%;
    }
  }
}
</style>
