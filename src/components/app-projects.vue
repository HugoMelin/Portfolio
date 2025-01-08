<script setup lang="ts">
  import ProjectCard from './project-card.vue';

  import { projects } from '@/data/projects.json';

</script>

<template>
  <section class="projects" id="projects">
    <h3>Projets</h3>
    <ul class="projects__list">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project"/>
    </ul>
  </section>
</template>

<style scoped>
  .projects {
    padding-bottom: 24px;
  }

  .projects__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
</style>