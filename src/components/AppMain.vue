<script>
import { store } from '../store.js';
import AppCard from './AppCard.vue';

export default {
    name: "AppMain",

    data() {
        return {
            store,
        }
    },

    components: {
        AppCard,
    },
}
</script>

<template>
    <div v-show="!store.isLoading" id="cards-container">
        <AppCard v-for="movie in store.movies" :movie="movie"></AppCard>
    </div>

    <div v-show="store.isLoading" id="loading-page">
        <p>Download titoli in corso...</p>
    </div>
</template>

<style lang="scss" scoped>
#cards-container {
    display: flex;
    flex-flow: row wrap;
}
</style>