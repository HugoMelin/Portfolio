<script setup lang="ts">
    import { computed } from 'vue';
    import {socialMedia} from '@/data/social-media.json';

    const copyright = computed(() =>{
        const currentYear = new Date().getFullYear()
        return `© Copyright ${currentYear} | Hugo Melin`
    });
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
            <div class="footer__social">
                <h3>Me retrouver</h3>
                <a v-for="social in socialMedia" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer">
                    <img :src="'/src/assets/img/social-media/'+social.icon" :alt="social.name">
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

    @media screen and (max-width: 768px) {
        .footer__borderRight {
            display: none;
        }

        .footer__content {
            flex-direction: column;
        }
        
    }
</style>