<script setup lang="ts">
import { socialMedia } from '@/data/social-media.json';

const socials = socialMedia;
</script>

<template>
  <header class="app-header">
    <img src="@/assets/img/photoProfil.jpg" alt="Hugo Melin" class="app-header__photo">
    <h1>Hugo Melin</h1>
    <h2>Développeur web Full Stack</h2>
    <section class="social-media">
      <ul class="social-media__list">
        <li v-for="social in socials" :key="social.name" class="social-media__item">
          <a :href="social.url" class="social-media__link" target="_blank">
            <img :src="(`/src/assets/img/social-media/${social.icon}`)" :alt="social.name" class="social-media__icon">
          </a>
        </li>
      </ul>
    </section>
  </header>
</template>

<style scoped>
  .app-header {
    padding: 24px 0;
  }

  .app-header__photo {
    object-fit: cover;
    object-position: top;
    border-radius: 50%;
    height: 300px;
    width: 300px;
  }

  .social-media__list {
    display: flex;
    justify-content: center;
    gap: 3rem
  }

  .social-media__item {
    padding: 8px 16px 0px 16px;
    background-color: var(--background-card);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
  }

  .social-media__item:hover {
    cursor: pointer;
    background-color: var(--hover-color);
  }
</style>