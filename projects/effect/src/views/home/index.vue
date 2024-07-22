<template>
  <div>
<!--    <List />-->
    <div v-for="i in 100"
         :key="i"
         :class="className"
         :style="{
           borderLeftWidth: (50 - Math.abs(50 - i)) * 2 + 'px',
         }">
      <span class="bg-[darkblue] block h-full opacity-20 w-[30px]" />
    </div>
    <ThreeLayout />
  </div>
</template>

<script setup lang="ts">
import ThreeLayout from "@/components/threeLayout.vue";
import List from "@/components/List.vue";

const className = "border-l-[#ffffff40] border-solid font-bold h-[30px] leading-[30px] relative text-[#fff] text-[16px] z-10";
</script>

<style scoped>

</style>
