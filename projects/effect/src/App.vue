<template>
  <div>
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
    var b = "c";
    console.log(`a${b}b`);
  },
  mounted() {
    console.log(this.aaa);
  }
};
</script>
<style scoped lang="scss"></style>
