<template>
  <div>
    <div class="h-[30px] leading-[30px] z-10 relative text-[#fff] font-bold text-[16px] border-l-[#ffffff40] border-solid" :style="{
      borderLeftWidth: (50 - Math.abs(50 - i)) * 2 + 'px',
    }" :key="i" v-for="i in 100">
      <span class="block w-[30px] h-full bg-[darkblue] opacity-20"></span>
    </div>
    <ThreeLayout />
  </div>
</template>

<script setup lang="ts">import ThreeLayout from "@/components/threeLayout.vue"; </script>

<style scoped>

</style>
