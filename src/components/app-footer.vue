<script setup lang="ts">
import { computed } from 'vue'
import { socialMedia } from '@/data/social-media.json'

const copyright = computed(() => {
  const currentYear = new Date().getFullYear()
  return `© Copyright ${currentYear} | Hugo Melin`
})

const getImageUrl = (name: string) => {
  return new URL(`../assets/img/social-media/${name}`, import.meta.url).href
}
</script>

<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__adress">
        <h3>Mes contacts</h3>
        <address>
          <a href="mailto:hugo.melin01@gmail.com">hugo.melin01@gmail.com</a>
          <a href="tel:+0640059650">06.40.05.96.50</a>
          <p>La Rochelle 17000</p>
        </address>
      </div>
      <div class="footer__borderRight"></div>
      <div class="download">
        <h3>Mon Curriculum Vitæ</h3>
        <a href="./CV_Hugo_Melin_2025.pdf" class="download__button" download>Télécharger mon CV</a>
      </div>
      <div class="footer__borderRight"></div>
      <div class="footer__social">
        <h3>Me retrouver</h3>
        <a
          v-for="social in socialMedia"
          :key="social.name"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img :src="getImageUrl(social.icon)" :alt="social.name" />
        </a>
      </div>
    </div>
    <div class="footer__copyright">
      <p>Dernières modifications :<time datetime="2025-01-07">Janvier 2025</time></p>
      <p class="copyright">{{ copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer__content {
  display: flex;
  justify-content: space-evenly;
  text-align: left;
}

footer * {
  color: var(--text-color);
  padding: 10px;
}

.footer__borderRight {
  border-right: 1px solid var(--text-color);
}

address {
  display: flex;
  flex-direction: column;
}

.footer__copyright {
  text-align: center;
}

time {
  font-style: italic;
}

.copyright {
  font-style: italic;
  font-size: 0.8em;
}

.footer__social__icon:hover {
  opacity: 50%;
}

.download {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.download h3 {
  align-self: start;
}

.download__button {
  padding: 0.75rem 1.5rem;
  background-color: var(--text-color);
  color: var(--background-color);
  border: none;
  border-radius: var(--border-radius);
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  transition: color 0.3s;
  font-size: 0.8em;
}

.download__button:hover:not(:disabled) {
  background-color: var(--hover-color);
  color: var(--text-color);
}

@media screen and (max-width: 768px) {
  .footer__borderRight {
    display: none;
  }

  .footer__content {
    flex-direction: column;
  }
}
</style>
