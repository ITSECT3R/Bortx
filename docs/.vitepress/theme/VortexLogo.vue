<script setup lang="ts">
import '@itsect3r/bortx/logo';
import '@itsect3r/bortx/borders';

defineProps<{
  size?: 'sm' | 'lg' | 'xl';
  variant?: 'cosmic';
}>();
</script>

<template>
  <div
    class="vortex border-effect border-rainbow border-slow"
    :class="[size ? `vortex-${size}` : '', variant ? `vortex-${variant}` : '']"
    :style="{ '--border-effect-radius': '9999px' }"
  >
    <div class="arm arm-1"></div>
    <div class="arm arm-2"></div>
    <div class="arm arm-3"></div>
    <div class="arm arm-4"></div>
    <div class="arm arm-5"></div>
    <div class="center"></div>
  </div>
</template>
