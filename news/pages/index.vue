<template>
    <div class="page">
        <CardComponent v-for="article in articles" :key="article.url" :data="article" />
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useAsyncData } from 'nuxt/app';
import CardComponent from './components/Card.vue';
import type { ApiStructure, Article } from '../types/api';

const API_KEY = '149a4a84ba2747a4bc0f69636f671a30';

const articles = ref<Article[]>([]);
const route = useRoute();

const fetchData = async (query: string) => {
    const queryString = `q=${query}&from=2024-07-27&sortBy=popularity&apiKey=${API_KEY}`;
    try {
        const { data } = await useAsyncData<ApiStructure>('getNews', () => $fetch(`https://newsapi.org/v2/everything?${queryString}`));
        if (data.value) {
            articles.value = data.value.articles;
            // console.log('Fetched articles:', data.value); // 데이터 출력
        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};

watchEffect(() => {
    const query = route.query.q ? String(route.query.q) : 'Apple';
    fetchData(query);
});
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