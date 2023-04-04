<script>
import { store } from '../store.js';
import AppCard from './AppCard.vue';
import JumboCard from './JumboCard.vue';
import SearchFilter from './SearchFilter.vue'

export default {
    name: "AppMain",

    data() {
        return {
            store,
        }
    },

    components: {
        AppCard,
        JumboCard,
        SearchFilter,
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
    <main>
        <div class="container">
            <JumboCard v-if="store.isJumboCardActive"></JumboCard>

            <div v-show="store.isMoviesReady" id="movies-container">
                <h2>Film</h2>

                <div v-show="!store.isMovieFiltered" class="page-status">
                    <p>Pagina {{ this.store.actualMoviesPage }} / {{ this.store.totalMoviesPages }}</p>

                    <button @click="$emit('prev-movies-page-search')">Prev Page</button>
                    <button @click="$emit('next-movies-page-search')">Next Page</button>
                </div>

                <SearchFilter :type="'movie'"></SearchFilter>

                <ul class="cards-container">
                    <AppCard v-if="store.isMovieFiltered" v-for="movie in store.filteredMovies" :type="'movie'"
                        :card="movie"></AppCard>
                    <AppCard v-else v-for="movie in store.movies" :type="'movie'" :card="movie"></AppCard>
                </ul>
            </div>

            <div v-show="store.isSeriesReady" id="series-container">
                <h2>Serie TV</h2>

                <SearchFilter :type="'series'"></SearchFilter>

                <div v-if="!store.isSeriesFiltered" class="page-status">
                    <p>Pagina {{ this.store.actualSeriesPage }} / {{ this.store.totalSeriesPages }}</p>

                    <button @click="$emit('prev-series-page-search')">Prev Page</button>
                    <button @click="$emit('next-series-page-search')">Next Page</button>
                </div>

                <ul class="cards-container">
                    <AppCard v-if="store.isSeriesFiltered" v-for="seriesItem in store.filteredSeries" :type="'seriesItem'"
                        :card="seriesItem">
                    </AppCard>
                    <AppCard v-else v-for="seriesItem in store.series" :type="'seriesItem'" :card="seriesItem">
                    </AppCard>
                </ul>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.cards-container {
    display: flex;

    flex-flow: row wrap;
    gap: 10px;

    list-style-type: none;
}
</style>