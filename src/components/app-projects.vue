<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectCard from './project-card.vue'
import { projects } from '@/data/projects.json'

const route = useRoute()
const router = useRouter()

// Liste des tags disponibles
const tags = ref([...new Set(projects.flatMap((project) => project.tag))].sort())

// Tag sélectionné
const selectedTag = ref(
  typeof route.query.tag === 'string' && tags.value.includes(route.query.tag) ? route.query.tag : '',
)
const perPage = ref(6)
const initialPage = Number(route.query.page)
const page = ref(Number.isInteger(initialPage) && initialPage > 0 ? initialPage : 1)
const syncingFromRoute = ref(false)

// Projets filtrés
const filteredProjects = computed(() => {
  if (!selectedTag.value) {
    return projects
  }
  return projects.filter((project) => project.tag.includes(selectedTag.value))
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProjects.value.length / perPage.value)))

const paginatedProjects = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filteredProjects.value.slice(start, start + perPage.value)
})

watch(
  filteredProjects,
  () => {
    if (page.value > totalPages.value) {
      page.value = totalPages.value
    }
  },
  { immediate: true },
)

watch(
  () => route.query,
  (query) => {
    syncingFromRoute.value = true

    const nextTag = typeof query.tag === 'string' && tags.value.includes(query.tag) ? query.tag : ''
    const nextPage = Number(query.page)

    selectedTag.value = nextTag
    page.value = Number.isInteger(nextPage) && nextPage > 0 ? Math.min(nextPage, totalPages.value) : 1

    syncingFromRoute.value = false
  },
)

watch(selectedTag, () => {
  if (syncingFromRoute.value) {
    return
  }
  page.value = 1
})

watch(
  [selectedTag, page],
  async ([nextTag, nextPage]) => {
    const nextQuery: Record<string, string> = {}

    if (nextTag) {
      nextQuery.tag = nextTag
    }

    if (nextPage > 1) {
      nextQuery.page = String(nextPage)
    }

    const currentTag = typeof route.query.tag === 'string' ? route.query.tag : ''
    const currentPage = typeof route.query.page === 'string' ? route.query.page : ''

    if (currentTag === (nextQuery.tag ?? '') && currentPage === (nextQuery.page ?? '')) {
      return
    }

    await router.replace({
      query: nextQuery,
      hash: route.hash || '#projects',
    })
  },
  { immediate: true },
)
</script>

<template>
  <section class="projects" id="projects">
    <h3>Mes projets</h3>
    <div class="filter">
      <label for="tag-select">Filtrer par tag :</label>
      <select id="tag-select" v-model="selectedTag">
        <option value="">Tous</option>
        <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>
    <ul class="projects__list">
      <ProjectCard v-for="(project, key) in paginatedProjects" :key="key" :project="project" />
    </ul>
    <div class="pagination" v-if="filteredProjects.length > perPage">
      <button @click="page--" :disabled="page === 1">Précédent</button>
      <span>Page {{ page }} / {{ totalPages }}</span>
      <button @click="page++" :disabled="page >= totalPages">Suivant</button>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding-bottom: 24px;
}

.filter {
  margin-bottom: 16px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
}

select {
  padding: 0.5rem;
  background-color: var(--background-card);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 0.25rem;
}

.projects__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: var(--text-color);
  color: var(--background-color);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
}

.pagination button:disabled {
  background-color: var(--border-color);
  cursor: not-allowed;
}
</style>
