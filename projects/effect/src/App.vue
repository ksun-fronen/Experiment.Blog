<template>
  <div>
    <span>App view-container</span>
    <router-view />
  </div>
</template>
<script lang="jsx">
export default {
  name: "App",
  components: {
    /*
    TestComponent: {
      props: {
        a: String,
        b: String,
        c: String,
      },
      render() {
        return <span>
          <br/>{this.a}
          <br/>{this.b}
          <br/>{this.c}
        </span>;
      }
    }
*/
  },
  data() {
    return {
    };
  },
  computed: {
    aaa() {
      return 5;
    }
  },
  created() {
    window.setLoadingState(Number.MAX_VALUE);
  },
  mounted() {

  }
};
</script>
<style scoped lang="scss"></style>
