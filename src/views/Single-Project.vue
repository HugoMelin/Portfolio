<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { projects } from '@/data/projects.json'
import { onMounted } from 'vue'
import ImgGallery from '@/components/img-gallery.vue'

const route = useRoute()
const slug = route.params.slug

const project = projects.find((project) => project.slug === slug)

if (!project) {
  console.error('Project not found')

  const router = useRouter()
  router.push({ name: 'NotFound' })
}

onMounted(() => {
  document.title = `${project?.name} - Hugo Melin` || 'Hugo Melin - Portfolio'
})
</script>

<template>
  <main class="app-main">
    <header>
      <h2>{{ project?.name }}</h2>
      <section class="project__info">
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2rem"
            height="1.2rem"
            fill="currentColor"
            class="bi bi-calendar"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-1h12V3a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v1z"
            />
          </svg>
          {{ project?.createDate }}
        </p>
        <a v-if="project?.link" :href="project?.link" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2rem"
            height="1.2rem"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path
              d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
            />
          </svg>
          Voir le projet
        </a>
      </section>
    </header>

    <section class="used-tech" v-if="project?.tag">
      <h3>Technologies utilisées</h3>
      <ul class="used-tech__list">
        <li v-for="tag in project?.tag" :key="tag" class="used-tech__item">{{ tag }}</li>
      </ul>
    </section>

    <section class="project-overview" v-if="project?.excerpt">
      <h3>Aperçu du projet</h3>
      <p>{{ project?.excerpt }}</p>
    </section>

    <section class="project-img">
      <h3>Le projet en images</h3>
      <section class="project-img__img">
        <ImgGallery :allImages="project?.image" />
        <!--<a
          v-for="(image, key) in project?.image"
          :key="key"
          :href="getImageUrl(image.src)"
          target="_blank"
        >
          <img :src="getImageUrl(image.src)" :alt="image.alt" />
        </a>-->
      </section>
    </section>

    <section class="project-description">
      <h3>Description du projet</h3>
      <p>{{ project?.description }}</p>
    </section>

    <router-link class="btn" :to="{ path: '/', hash: '#projects' }"
      >Retour au Portfolio</router-link
    >
  </main>
</template>

<style scoped>
h2 {
  font-size: 2.5rem;
  font-weight: bold;
}

.app-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: start;
}

.project__info {
  display: flex;
  gap: 2rem;
}

.used-tech__list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.used-tech__item {
  background-color: var(--background-card);
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.project-overview,
.project-description {
  background-color: var(--background-card);
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.btn {
  border-radius: var(--border-radius);
  padding: 8px 16px;
  background-color: var(--hover-color);
  border: 1px solid var(--border-color);
  width: fit-content;
  margin: auto;
  transition: background-color 0.3s;
  transition: color 0.3s;
}

.btn:hover {
  background-color: var(--text-color);
  color: var(--hover-color);
}

a:hover {
  color: var(--hover-color);
}
</style>
