<!--
  <script lang="ts" setup>
  import ListItem from "@/components/ListItem.vue";
  import {getCurrentInstance, onMounted, provide, ref} from "vue";

  const childs = ref([ 1, 2, 3 ]);
  provide("List", getCurrentInstance());
  console.log("getCurrentInstance()", childs);
  onMounted(function(){
  console.log(getCurrentInstance(),'this')
  })
  </script>
-->
<script lang="ts">
import ListItem from "@/components/ListItem.vue";
import { getCurrentInstance } from "vue";

export default {
  name: "List",
  components: {
    ListItem,
  },
  provide() {
    return {
      List: getCurrentInstance(),
    };
  },
  data() {
    return {
      listItems: [ ],
    };
  },
  mounted() {
    console.log("Mounted - 我的儿子们", this.listItems);
  },
};
</script>

<template>
  <div>
    <ListItem v-for="i in 10"
              :key="i" />
  </div>
</template>

<style scoped>

</style>
