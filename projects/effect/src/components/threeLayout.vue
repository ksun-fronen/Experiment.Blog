<script setup lang="ts">
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ref } from "vue";

const canvasLayoutRef = ref();
const loader = new GLTFLoader();
// console.log("canvasLayoutRef", THREE, canvasLayoutRef, "loader", loader);

loader.load("/assets/sketch-fab_common-models/scene.gltf?raw", (gltf) => {
  console.log("gltf", gltf);
});
</script>

<template>
  <div class="">
    <canvas ref="canvasLayoutRef"
            class="h-[100vh] w-[100vw]" />
  </div>
</template>

<style scoped>

</style>
