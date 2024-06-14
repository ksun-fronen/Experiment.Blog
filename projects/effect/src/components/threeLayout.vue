<script setup lang="ts">
import * as THREE from "three";
import { ref } from "vue";

const canvasLayoutRef = ref();
console.log("canvasLayoutRef", THREE, canvasLayoutRef);
</script>

<template>
  <div class="">
    <canvas ref="canvasLayoutRef"
            class="h-[100vh] w-[100vw]" />
  </div>
</template>

<style scoped>

</style>
