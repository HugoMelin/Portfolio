<script setup lang="ts">
  import { defineProps } from 'vue';

  const { project } = defineProps<{
    project: {
      id: number;
      tag: string[];
      name: string;
      createDate: string;
      description: string;
      excerpt: string;
      image: {
        src: string;
        alt: string;
      }[];
      link: string;
      slug: string;
    };
  }>();

  let excerptFormated = project.excerpt;
  if (excerptFormated.length > 100) {
    excerptFormated = excerptFormated.substring(0, 97) + '...';
  }
</script>

<template>
  <article class="project">
    <h4>{{ project.name }}</h4>
    <p>{{ excerptFormated }}</p>
    <router-link :to="`/project/${project.slug}`">Voir le projet</router-link>
  </article>
</template>

<style scoped>
  .project {
    text-align: start;
    background-color: var(--background-card);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
  }

  h4 {
    margin-bottom: 8px;
    font-weight: bold;
  }

  p {
    margin-bottom: 16px;
    flex-grow: 1;
  }

  a {
    border-radius: 4px;
    padding: 4px;
    background-color: var(--background-secondary);
    border: 1px solid var(--border-color);
    width: fit-content;
  }

  a:hover {
    color: var(--hover-color);
    text-decoration: underline;
    background-color: var(--text-color);
    transition: background-color 0.3s;
    transition: color 0.3s;
  }
</style>