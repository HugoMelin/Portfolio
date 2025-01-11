<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectCard from './project-card.vue'
import { projects } from '@/data/projects.json'

// Liste des tags disponibles
const tags = ref([...new Set(projects.flatMap((project) => project.tag))].sort())

// Tag sélectionné
const selectedTag = ref('')

// Projets filtrés
const filteredProjects = computed(() => {
  if (!selectedTag.value) {
    return projects
  }
  return projects.filter((project) => project.tag.includes(selectedTag.value))
})
</script>

<template>
  <section class="projects" id="projects">
    <h3>Projets</h3>
    <div class="filter">
      <label for="tag-select">Filtrer par tag :</label>
      <select id="tag-select" v-model="selectedTag">
        <option value="">Tous</option>
        <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>
    <ul class="projects__list">
      <ProjectCard v-for="(project, key) in filteredProjects" :key="key" :project="project" />
    </ul>
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
</style>
