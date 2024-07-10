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
import { AnimationMixer } from "three/src/animation/AnimationMixer.js";
import { AnimationAction } from "three/src/animation/AnimationAction.js";
import { AnimationClip } from "three";

window.gsap.registerPlugin(ScrollTrigger);

const canvasLayoutRef: Ref<HTMLElement | undefined> = ref();
const loader = new GLTFLoader();
// console.log("canvasLayoutRef", THREE, canvasLayoutRef, "loader", loader);
// const girlModelAsset = new URL("/assets/sketch-fab_common-models/just_a_girl/scene.gltf", import.meta.url);
// console.log("girlModelAsset", girlModelAsset);

let isDestroyed = false;
let mixer: AnimationMixer;
let clip: AnimationClip;
let cubeClipAction: AnimationAction;
const clock = new THREE.Clock();

onMounted(() => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();

  const width = window.innerWidth || 1;
  const height = window.innerHeight || 1;
  const _aspect = width / height;
  const devicePixelRatio = window.devicePixelRatio || 1;
  const camera = new THREE.PerspectiveCamera(75, _aspect, 0.1, 1000);
  const gsapModel = {
    process: 0,
  };

  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setAnimationLoop(animate);

  camera.position.set(0, 120, 120);
  // 暂时不了解这一句
  // renderer.outputColorSpace = THREE.SRGBColorSpace;


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

  // 创建背景图
  function createSceneBackground() {
    const clearPass = new ClearPass(params.clearColor, params.clearAlpha);
    const texturePass = new TexturePass();
    const renderPass = new RenderPass(scene, camera);
    let cubeTexturePassP;
    composer.addPass(clearPass);
    composer.addPass(texturePass);
    renderPass.clear = false;
    composer.addPass(renderPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

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
  }

  // 光源
  function createLight() {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(50, 150, 80);
    scene.add(hemiLight);

    const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper);
  }

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
    const model = gltf.scene;

    mixer = new THREE.AnimationMixer(model);
    cubeClipAction = mixer.clipAction(gltf.animations[0]);
    cubeClipAction.play();

    clip = cubeClipAction.getClip();

    // eslint-disable-next-line no-multi-assign,no-param-reassign
    model.scale.x = model.scale.y = model.scale.z = 30;
    model.position.y = 100;
    model.position.x = -100;
    scene.add(model);
    // render();
  }, undefined, console.error);

  if (canvasLayoutRef.value) {
    const canvas = renderer.domElement;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvasLayoutRef.value.appendChild(canvas);
  }

  // 摄像头控制
  function createControls() {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render); // use if there is no animation loop
    controls.minDistance = 100;
    controls.maxDistance = 1000;
    controls.target.set(50, 150, 80);
    controls.update();
  }

  function onResize() {
    const _width = window.innerWidth;
    const _height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(_width, _height);
    composer.setSize(_width, _height);
  }

  function mixerRender(delta: number) {
    if (mixer) {
      mixer.update(delta);
    }
  }

  function render() {
    renderer.render(scene, camera);
    composer.render();
  }

  function animate() {
    if (isDestroyed) return;
    const delta = clock.getDelta();

    render();
    // mixerRender(delta);
  }

  function setGsap() {
    gsap.to(gsapModel, {
      process: 1,
      duration: 2,
      scrollTrigger: {
        trigger: canvasLayoutRef.value,
        start: "top top",
        end: "bottom",
        scrub: true,
        markers: true,
        onUpdate: () => {
          mixer.setTime(clip.duration * gsapModel.process);
          // console.log("self", self);
        },
      },
    });
  }

  createLight();
  createSceneBackground();
  // createControls();
  animate();
  setGsap();
  window.addEventListener("resize", onResize);
});

const gsapModel = {
  process: 0,
};

function seekAnimationTime(animMixer: any, timeInSeconds: number) {
  // const delta = clock.getDelta();
  gsapModel.process %= clip.duration;
  window.gsap.to(gsapModel, {
    process: gsapModel.process + 0.5,
    duration: 2,
    onUpdate: () => {
      animMixer.setTime(clip.duration * gsapModel.process);
    },
  });

  // animMixer.update(2);
}

function onFramePlay() {
  if (mixer) {
    // cubeClipAction?.();
    // mixer.update(1);
    seekAnimationTime(mixer);
  }
}

onUnmounted(() => {
  isDestroyed = true;
});
</script>

<template>
  <div class="h-[1500px]">
    <div ref="canvasLayoutRef"
         class="h-[100vh] w-fill">
    <!--
      <canvas ref="canvasLayoutRef"
      class="h-[100vh] w-[100vw]" />
    -->
    </div>
    <div class="absolute left-0 top-0 z-index-[100]">
      <a class="bg-[#000] flex items-center p-2 rounded-2xl select-none text-white"
         @click="onFramePlay">逐帧播放</a>
    </div>
  </div>
</template>

<style scoped>

</style>
