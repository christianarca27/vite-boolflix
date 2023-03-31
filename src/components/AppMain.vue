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

    emits: [
        "prev-movies-page-search",
        "next-movies-page-search",
        "prev-series-page-search",
        "next-series-page-search",
    ],
}
</script>

<template>
    <div v-show="store.isMoviesReady" id="movies-container">
        <h2>Movies</h2>

        <div class="cards-container">
            <AppCard v-for="movie in store.movies" :type="'movie'" :card="movie"></AppCard>
        </div>

        <div class="page-status">
            <p>{{ this.store.actualMoviesPage }} / {{ this.store.totalMoviesPages }}</p>

            <button @click="$emit('prev-movies-page-search')">Prev Page</button>
            <button @click="$emit('next-movies-page-search')">Next Page</button>
        </div>
    </div>

    <div v-show="store.isSeriesReady" id="series-container">
        <h2>Series</h2>

        <div class="cards-container">
            <AppCard v-for="serie in store.series" :type="'serie'" :card="serie"></AppCard>
        </div>

        <div class="page-status">
            <p>{{ this.store.actualSeriesPage }} / {{ this.store.totalSeriesPages }}</p>

            <button @click="$emit('prev-series-page-search')">Prev Page</button>
            <button @click="$emit('next-series-page-search')">Next Page</button>
        </div>
    </div>

    <div v-show="!store.isMoviesReady || !store.isSeriesReady" id="loading-page">
        <p>Download titoli in corso...</p>
    </div>
</template>

<style lang="scss" scoped>
.cards-container {
    width: 100%;

    display: flex;
    flex-flow: row nowrap;
}
</style>