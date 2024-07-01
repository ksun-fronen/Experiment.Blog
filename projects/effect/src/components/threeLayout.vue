<script setup lang="ts">
import { onMounted, onUnmounted, Ref, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { TexturePass } from "three/addons/postprocessing/TexturePass.js";
import { CubeTexturePass } from "three/addons/postprocessing/CubeTexturePass.js";
import { ClearPass } from "three/examples/jsm/postprocessing/ClearPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const canvasLayoutRef: Ref<HTMLElement | undefined> = ref();
const loader = new GLTFLoader();
// console.log("canvasLayoutRef", THREE, canvasLayoutRef, "loader", loader);
// const girlModelAsset = new URL("/assets/sketch-fab_common-models/just_a_girl/scene.gltf", import.meta.url);
// console.log("girlModelAsset", girlModelAsset);

let isDestroyed = false;

onMounted(() => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();

  const width = window.innerWidth || 1;
  const height = window.innerHeight || 1;
  const _aspect = width / height;
  const devicePixelRatio = window.devicePixelRatio || 1;
  const camera = new THREE.PerspectiveCamera(75, _aspect, 0.1, 1000);

  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(width, height);

  renderer.setAnimationLoop(animate);
  camera.position.set(0, 120, 120);
  // 官方例子导入
  renderer.outputColorSpace = THREE.SRGBColorSpace;


  const params = {

    clearPass: true,
    clearColor: "white",
    clearAlpha: 1.0,

    texturePass: true,
    texturePassOpacity: 1.0,

    cubeTexturePass: true,
    cubeTexturePassOpacity: 1.0,

    renderPass: true,
  };

  const composer = new EffectComposer(renderer);

  const clearPass = new ClearPass(params.clearColor, params.clearAlpha);
  composer.addPass(clearPass);
  let cubeTexturePassP;
  const texturePass = new TexturePass();
  composer.addPass(texturePass);

  // 光源
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
  scene.add(hemiLightHelper);


  const genCubeUrls = function (prefix: any, postfix: any) {
    return [
      `${prefix}px${postfix}`, `${prefix}nx${postfix}`,
      `${prefix}py${postfix}`, `${prefix}ny${postfix}`,
      `${prefix}pz${postfix}`, `${prefix}nz${postfix}`,
    ];
  };
  const ldrUrls = genCubeUrls("/assets/textures/cube/pisa/", ".png");
  new THREE.CubeTextureLoader().load(ldrUrls, (ldrCubeMap) => {
    cubeTexturePassP = new CubeTexturePass(camera, ldrCubeMap);
    composer.insertPass(cubeTexturePassP, 2);
  });

  const renderPass = new RenderPass(scene, camera);
  renderPass.clear = false;
  composer.addPass(renderPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  // const textureLoader = new THREE.TextureLoader();

  // 设置渲染容器的实际大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  /* loader.load("/assets/sketch-fab_common-models/just_a_girl/scene.gltf", (gltf) => {
    console.log("gltf", gltf);
    scene.add(gltf.scene);
    // gltf.scene.rotateX(320);
    render();
  }, undefined, (error) => {
    console.error(error);
  }); */
  loader.load("/assets/my-cube/extend_cube.gltf", (gltf) => {
    console.log("gltf", gltf.scene);
    // eslint-disable-next-line no-multi-assign,no-param-reassign
    gltf.scene.scale.x = gltf.scene.scale.y = gltf.scene.scale.z = 30;
    scene.add(gltf.scene);
    // render();
  }, undefined, console.error);

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

  window.addEventListener("resize", onResize);

  function onResize() {
    const _width = window.innerWidth;
    const _height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(_width, _height);
    composer.setSize(_width, _height);
  }

  function render() {
    renderer.render(scene, camera);
    composer.render();
  }

  function animate() {
    if (isDestroyed) return;
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
