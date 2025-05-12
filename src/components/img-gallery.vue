<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

type Image = {
  src: string;
  alt: string;
  height: number;
  width: number;
  featured?: boolean; // Optional featured property
};

const props = defineProps<{ allImages: Image[] | undefined }>();

const allImages = props.allImages;
const columns = ref(3);
const selectedImage = ref('');
const showModal = ref(false);

const handleResize = () => {
  if (window.innerWidth < 640) {
    columns.value = 1
  } else if (window.innerWidth < 1024) {
    columns.value = 2
  } else {
    columns.value = 3
  }
}

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const getImageUrl = (name: string) => {
  return new URL(`../assets/img/projets/${name}`, import.meta.url).href
}
</script>

<template>
  <div class="grid">
    <div v-for="columnIndex in columns" :key="columnIndex" class="flex-column">
      <div
        v-for="image in allImages?.filter((_, index) => index % columns === columnIndex - 1)"
        :key="image.src"
        class="image-container"
        :class="{ 'featured': image.featured }"
      >
        <img :src="getImageUrl(image.src)" :alt="image.alt" class="image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.image-container.featured {
  outline: 2px solid #3b82f6;
}

.image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.image-container:hover .image {
  transform: scale(1.05);
}
</style>
