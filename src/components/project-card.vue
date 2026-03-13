<script setup lang="ts">
  const { project } = defineProps<{
    project: {
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

  const getImageUrl = (name: string) => {
    return new URL(`../assets/img/projets/${name}`, import.meta.url).href
  }
</script>

<template>
  <article class="project">
    <img :src="getImageUrl(project.image[0].src)" :alt="project.image[0].alt" loading="lazy"/>
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

  img {
    aspect-ratio: 16/10;
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: top;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
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
    padding: 0.5rem 1rem;
    background-color: var(--background-secondary);
    border: 1px solid var(--border-color);
    width: fit-content;
  }

  a:hover {
    color: var(--hover-color);
    background-color: var(--text-color);
    transition: background-color 0.3s;
    transition: color 0.3s;
  }
</style>
