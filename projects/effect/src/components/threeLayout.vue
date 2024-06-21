<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, Ref, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const canvasLayoutRef: Ref<HTMLElement | undefined> = ref();
const loader = new GLTFLoader();
// console.log("canvasLayoutRef", THREE, canvasLayoutRef, "loader", loader);
// const girlModelAsset = new URL("/assets/sketch-fab_common-models/just_a_girl/scene.gltf", import.meta.url);
// console.log("girlModelAsset", girlModelAsset);

let isDestroyed = false;

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  camera.position.set(0, 120, 120);
  // 官方例子导入
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // 设置渲染容器的实际大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  loader.load("/assets/sketch-fab_common-models/just_a_girl/scene.gltf", (gltf) => {
    console.log("gltf", gltf);
    scene.add(gltf.scene);
    // gltf.scene.rotateX(320);
    render();
  }, undefined, (error) => {
    console.error(error);
  });
  if (canvasLayoutRef.value) {
    canvasLayoutRef.value.appendChild(renderer.domElement);
  }

  // 摄像头控制
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render); // use if there is no animation loop
  controls.minDistance = 100;
  controls.maxDistance = 1000;
  controls.target.set(0, 30, 0);
  controls.update();

  window.addEventListener("resize", render);

  function render() {
    renderer.render(scene, camera);
  }

  function animate() {
    if (isDestroyed) return;
    requestAnimationFrame(animate);
    render();
  }
  animate();
});

onUnmounted(() => {
  isDestroyed = true;
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
