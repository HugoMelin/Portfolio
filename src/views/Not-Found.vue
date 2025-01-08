<script setup lang="ts">
  import { onMounted } from 'vue';

  onMounted(() => {
      document.title = 'Page Non Trouvée - Hugo Melin';
    });
</script>

<template>
  <div class="not-found">
    <div class="content">
      <h2 class="title-1">404</h2>
      <h2 class="title-2">Page Non Trouvée</h2>
      <p>Oups ! La page que vous recherchez n'existe pas.</p>
      <router-link to="/">
        <button class="button">Retour à l'accueil</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .not-found {
    background: linear-gradient(to bottom, var(--background-card), var(--background-secondary));
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .content {
    text-align: center;
  }

  .title-1 {
    font-size: 6rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .title-2 {
    font-size: 1.875rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.25rem;
    color: var(--text-color);
    margin-bottom: 2rem;
  }

  .button {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
    background-color: var(--hover-color);
    color: var(--text-color);
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s;
    transition: color 0.3s;
  }

  .button:hover {
    background-color: var(--text-color);
    color: var(--hover-color);
  }
</style>
