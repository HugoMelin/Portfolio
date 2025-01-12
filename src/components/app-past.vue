<script lang="ts" setup>
  import { ref } from 'vue';
  import PastCard from './past-card.vue';

  import { annees } from '@/data/schools.json';
  import { experiences } from '@/data/experiences.json';

  const filter = ref('parcours');
</script>

<template>
  <section class="past">
    <h3>Mon parcours et mes expériences</h3>
    <ul class="filter">
      <li @click="filter='parcours'" :class="[filter==='parcours' ? 'active' : '', 'filter__item']">Parcours</li>
      <li @click="filter='experiences'" :class="[filter==='experiences' ? 'active' : '', 'filter__item']">Expériences</li>
    </ul>

    <h3 class="past__title-3">{{ filter==='parcours'?'Parcours scolaire':'Expériences professionnelles'}}</h3>
    <section v-if="filter==='parcours'" class="ecoles">
      <div class="timeline-line"></div>
      <PastCard v-for="(annee, index) in annees" :key="index" :annee="annee" :class="filter"/>
    </section>

    <section v-if="filter==='experiences'" class="works">
      <div class="timeline-line"></div>
      <PastCard v-for="(experience, index) in experiences" :key="index" :annee="experience" :class="filter"/>
    </section>
  </section>
</template>

<style scoped>
  .past {
    padding-bottom: 24px;
  }

  .past__title-3 {
    text-align: center;
  }

  .filter {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 16px;
  }

  .filter__item {
    background-color: var(--background-card);
    padding: 8px 16px;
    cursor: pointer;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
  }

  .filter__item:hover {
    background-color: var(--hover-color);
  }
  .active {
    background-color: var(--background-secondary);
  }

  @media screen and (min-width: 821px) {
    .ecoles, .works {
      display: flex;
      flex-direction: column;
      align-content: space-between;
      position: relative;
    }

    .timeline-line {
      position: absolute;
      left: 50%;
      top: 0;
      height: 100%;
      transform: translateX(-50%);
      width: 2px;
      background-color: var(--border-color);
      z-index: 1;
    }

    .parcours, .experiences {
      width: 48%;
    }

    .parcours:nth-child(2n), .experiences:nth-child(2n+1) {
      align-self: start;
    }

    .parcours:nth-child(2n+1), .experiences:nth-child(2n) {
      align-self: end;
    }
  }
</style>
