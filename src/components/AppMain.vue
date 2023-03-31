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
        "prev-page-search",
        "next-page-search",
    ],
}
</script>

<template>
    <div v-show="!store.isLoading" id="cards-container">
        <AppCard v-for="movie in store.movies" :movie="movie"></AppCard>

        <div id="change-page">
            <p>{{ this.store.actualPage }} / {{ this.store.totalResultPages }}</p>

            <button @click="$emit('prev-page-search')">Prev Page</button>
            <button @click="$emit('next-page-search')">Next Page</button>
        </div>
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