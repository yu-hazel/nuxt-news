<template>
    <div class="page">
        <CardComponent v-for="article in articles" :key="article.url" :data="article" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAsyncData } from "nuxt/app";
import CardComponent from "./components/Card.vue";
import type { ApiStructure, Article } from "../types/api";

const API_KEY = '149a4a84ba2747a4bc0f69636f671a30';
const API_URL = `https://newsapi.org/v2/everything?q=Apple&from=2024-07-27&sortBy=popularity&apiKey=${API_KEY}`;

const articles = ref<Article[]>([]);

const fetchData = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiStructure = await response.json();
        articles.value = data.articles;
        console.log('Fetched articles:', data); // 데이터 출력
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(fetchData);
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;

    width: calc(100% - 96px);

    padding: 48px;
    gap: 24px;
}
</style>