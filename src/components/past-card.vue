<script lang="ts" setup>
  const { annee } = defineProps<{
    annee: {
      name: string;
      title: string;
      date: string;
      comment: string[];
    }
  }>();
</script>

<template>
  <article class="card">
    <h4 class="card__title">{{ annee.name }}</h4>
    <p class="card__info">{{ annee.title }} <span class="separation">|</span> {{ annee.date }}</p>
    <ul>
      <li class="card__comment" v-for="(comment, index) in annee.comment" v-if="comment !== ''" :key="index">{{ comment }}</li>
    </ul>
  </article>
</template>

<style scoped>
  .card {
    text-align: left;
    padding: 16px;
    background-color: var(--background-card);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    margin: 16px 0;
  }
  .separation {
    margin: 0 8px;
  }

  ul {
    padding-left: 2rem;
  }

  .card__comment {
    list-style-type: disc;
    margin: 8px 0;
  }
</style>