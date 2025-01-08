<script setup lang="ts">
  import { skills } from '@/data/skills.json';
</script>

<template>
  <section class="skills">
    <h3>Mes compétences</h3>
    <ul class="skills__list">
      <li v-for='skill in skills' :key="skill.name" class="skill__item">{{ skill.name }}</li>
    </ul>
  </section>
</template>

<style scoped>
  .skills {
    padding-bottom : 24px;
  }

  .skills__list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .skill__item {
    background-color: var(--background-card);
    color: var(--text-color);
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
  }
</style>