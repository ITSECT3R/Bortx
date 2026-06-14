<script setup lang="ts">
import { onMounted, nextTick } from 'vue';

const effects = [
  'border-rainbow',
  'border-pulse',
  'border-neon',
  'border-light-trail',
  'border-shimmer',
  'border-corner-highlight',
];

onMounted(() => {
  nextTick(() => {
    document.querySelectorAll('.VPFeatures .VPFeature').forEach((el, i) => {
      el.classList.add(
        'border-effect',
        'border-hover-only',
        'border-glow',
        effects[i % effects.length]
      );
    });
  });
});
</script>

<template>
  <div style="display: none" aria-hidden="true" />
</template>
