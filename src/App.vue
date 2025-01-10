<script setup lang="ts">
import AppFooter from '@/components/app-footer.vue';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <router-view />
  <AppFooter />
  <div @click="scrollToTop" class="scroll-to-top">⬆️</div>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: var(--hover-color);
  color: var(--text-color);
  padding: 10px;
  border-radius: var(--border-radius);
  cursor: pointer;
}
</style>
