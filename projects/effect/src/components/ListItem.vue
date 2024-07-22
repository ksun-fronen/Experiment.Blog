<script lang="ts">
import ListItemChildren from "@/components/ListItemChildren.vue";

export default {
  name: "ListItem",
  components: {
    ListItemChildren,
  },
  inject: {
    root: "List",
  },
  created() {
    this.root.data.listItems.push(this);
  },
};
</script>

<template>
  <div>
    <ListItemChildren />
  </div>
</template>

<style scoped>

</style>
