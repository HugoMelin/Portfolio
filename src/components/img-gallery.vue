<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, onMounted, onUnmounted } from 'vue';

type Image = {
  src: string;
  alt: string;
};

const props = defineProps<{ allImages: Image[] | undefined }>();

const allImages = props.allImages;
const columns = ref(3);
const selectedImage: Ref<string | null> = ref(null);
const showInfo = ref(false);

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

const openModal = (image: Image) => {
  selectedImage.value = image.src;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedImage.value = null;
  showInfo.value = false;
  document.body.style.overflow = "auto";
};

interface KeyboardEventWithKey extends KeyboardEvent {
  key: string;
}

const handleKeyDown = (e: KeyboardEventWithKey): void => {
  if (e.key === "Escape") {
    closeModal();
  } else if (e.key === "ArrowRight") {
    navigateImage("next");
  } else if (e.key === "ArrowLeft") {
    navigateImage("prev");
  } else if (e.key === "i") {
    showInfo.value = !showInfo.value;
  }
};

const navigateImage = (direction: "next" | "prev"): void => {
  if (!allImages || !selectedImage.value) return;

  const currentIndex: number = allImages.findIndex(
    (img: Image) => img.src === selectedImage.value
  );
  if (currentIndex === -1) return;

  let newIndex: number;

  if (direction === "next") {
    newIndex = (currentIndex + 1) % allImages.length;
  } else {
    newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  }

  selectedImage.value = allImages[newIndex].src;
};
</script>

<template>
  <div class="grid">
    <div v-for="columnIndex in columns" :key="columnIndex" class="flex-column">
      <div v-for="image in allImages?.filter((_, index) => index % columns === columnIndex - 1)" :key="image.src"
        class="image-container" @click="openModal(image)">
        <img :src="getImageUrl(image.src)" :alt="image.alt" class="image" loading="lazy" />
      </div>
    </div>
  </div>

  <div v-if="selectedImage !== null" class="modal-overlay" @keydown="handleKeyDown" tabindex="0" @click.self="closeModal">
    <button @click="closeModal" class="modal-btn btn-close" aria-label="Fermer">
      <p class="icon">X</p>
    </button>
    <button @click="navigateImage('prev')" class="modal-btn btn-prev" aria-label="Image précédente">
      <p class="icon">←</p>
    </button>
    <button @click="navigateImage('next')" class="modal-btn btn-next" aria-label="Image suivante">
      <p class="icon">→</p>
    </button>
    <div v-for="image in allImages?.filter((img) => img.src === selectedImage)" :key="image.src"
      class="modal-img-container">
      <img :src="getImageUrl(image.src)" :alt="image.alt" class="modal-img" />
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

.image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.image-container:hover .image {
  transform: scale(1.05);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-btn {
  color: var(--text-color);
  position: absolute;
  z-index: 10;
  border-radius: var(--border-radius);
  padding: 8px 16px;
  background-color: var(--hover-color);
  border: 1px solid var(--border-color);
  width: fit-content;
  margin: auto;
  transition: background-color 0.3s;
  transition: color 0.3s;
  transition: background 0.2s, color 0.2s;
}

.modal-btn:hover {
    background-color: var(--text-color);
    color: var(--hover-color);
}

.btn-close {
  top: 1rem;
  right: 1rem;
}

.btn-prev {
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.btn-next {
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.modal-img-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-img {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
}
</style>
