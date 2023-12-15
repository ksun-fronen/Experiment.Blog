<template>
  <div>
    <router-view />
    <span ref="dsadas"
          ccc="111"
          data-id="aaa"
          eee="555">
      ds1111ak lddsa21322 222 dsadsa2212 221 123122dsds 321222ajas kl123aaa
    </span>111 dsadsa<div>
      12123132s 33 123
    </div>
    <TestComponent a="666"
                   b="5"
                   c="dsadsa" />
  </div>
</template>
<script lang="jsx">
export default {
  name: "App",
  components: {
    TestComponent: {
      props: {
        a: String,
        b: String,
        c: String,
      },
      render() {
        return <span>
          {this.a}
          {this.b}
          {this.c}
        </span>;
      }
    }
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
    var b = "c";
    console.log(`a${b}b`);
  },
  mounted() {
    console.log(this.aaa);
  }
};
</script>
<style scoped lang="scss"></style>
