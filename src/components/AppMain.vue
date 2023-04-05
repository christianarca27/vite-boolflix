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

            <div v-show="store.isTrendingVisible" id="trending-movies">
                <h2>Film più visti di oggi</h2>

                <ul class="cards-container">
                    <AppCard v-for="movie in store.trendingMovies" :type="'movie'" :card="movie"></AppCard>
                </ul>
            </div>

            <div v-show="store.isTrendingVisible" id="trending-series">
                <h2>Serie più viste di oggi</h2>

                <ul class="cards-container">
                    <AppCard v-for="seriesItem in store.trendingSeries" :type="'seriesItem'" :card="seriesItem"></AppCard>
                </ul>
            </div>

            <div v-show="store.isMoviesReady" id="movies-container">
                <h2>Risultati in Film</h2>

                <div v-show="!store.isMovieFiltered" class="page-status">
                    <button @click="$emit('prev-movies-page-search')">Pagina precedente</button>

                    <p>Pagina {{ this.store.actualMoviesPage }} / {{ this.store.totalMoviesPages }}</p>

                    <button @click="$emit('next-movies-page-search')">Pagina successiva</button>
                </div>

                <SearchFilter :type="'movie'"></SearchFilter>

                <ul class="cards-container">
                    <AppCard v-if="store.isMovieFiltered" v-for="movie in store.filteredMovies" :type="'movie'"
                        :card="movie"></AppCard>
                    <AppCard v-else v-for="movie in store.movies" :type="'movie'" :card="movie"></AppCard>
                </ul>
            </div>

            <div v-show="store.isSeriesReady" id="series-container">
                <h2>Risultati in Serie TV</h2>

                <div v-if="!store.isSeriesFiltered" class="page-status">
                    <button @click="$emit('prev-series-page-search')">Pagina precedente</button>
                    <p>Pagina {{ this.store.actualSeriesPage }} / {{ this.store.totalSeriesPages }}</p>
                    <button @click="$emit('next-series-page-search')">Pagina successiva</button>
                </div>

                <SearchFilter :type="'series'"></SearchFilter>

                <ul class="cards-container">
                    <AppCard v-if="store.isSeriesFiltered" v-for="seriesItem in store.filteredSeries" :type="'seriesItem'"
                        :card="seriesItem"></AppCard>
                    <AppCard v-else v-for="seriesItem in store.series" :type="'seriesItem'" :card="seriesItem"></AppCard>
                </ul>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
h2 {
    margin-bottom: 1rem;
}

#trending-movies,
#trending-series {
    .cards-container {
        display: flex;
        flex-flow: row nowrap;
        overflow-y: auto;
    }
}

.page-status {
    margin-bottom: 1rem;

    display: flex;
    align-items: center;
    gap: 1rem;
}

.cards-container {
    display: flex;

    flex-flow: row wrap;
    gap: 10px;

    list-style-type: none;
}
</style>