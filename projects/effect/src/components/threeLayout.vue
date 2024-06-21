<script setup lang="ts">
import { onBeforeMount, onMounted, Ref, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const canvasLayoutRef: Ref<HTMLElement | undefined> = ref();
const loader = new GLTFLoader();
// console.log("canvasLayoutRef", THREE, canvasLayoutRef, "loader", loader);
// const girlModelAsset = new URL("/assets/sketch-fab_common-models/just_a_girl/scene.gltf", import.meta.url);
// console.log("girlModelAsset", girlModelAsset);

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  // 官方例子导入
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  renderer.setSize(window.innerWidth, window.innerHeight);
  loader.load("/assets/sketch-fab_common-models/just_a_girl/scene.gltf", (gltf) => {
    console.log("gltf", gltf);
    scene.add(gltf.scene);

    animate();
  }, void 0, (error) => {
    console.error(error);
  });
  if (canvasLayoutRef.value) {
    canvasLayoutRef.value.appendChild(renderer.domElement);
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", animate); // use if there is no animation loop
  controls.minDistance = 400;
  controls.maxDistance = 1000;
  controls.target.set(10, 90, -16);
  controls.update();

  window.addEventListener("resize", animate);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
});
</script>

<template>
  <div ref="canvasLayoutRef"
       class="h-[100vh] w-[100vw]">
       <!--
         <canvas ref="canvasLayoutRef"
         class="h-[100vh] w-[100vw]" />
       -->
  </div>
</template>

<style scoped>

</style>
