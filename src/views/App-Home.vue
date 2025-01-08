<script setup lang="ts">
  import AppAbout from '@/components/app-about.vue';
  import AppSkills from '@/components/app-skills.vue';
  import AppPast from '@/components/app-past.vue';
  import AppContact from '@/components/app-contact.vue';
  import AppProjects from '@/components/app-projects.vue';
import { onMounted } from 'vue';

  onMounted(() => {
    document.title = 'Hugo Melin - Portfolio';
  });
</script>

<template>
  <main class="app-main">
    <AppAbout />

    <AppSkills />

    <AppProjects />

    <AppPast />

    <AppContact />
  </main>
</template>

<style scoped>
</style>
