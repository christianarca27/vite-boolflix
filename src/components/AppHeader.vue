<script>
import { store } from '../store.js';

export default {
    name: "AppHeader",

    data() {
        return {
            store,
        }
    },

    emits: [
        "perform-search",
    ],
}
</script>

<template>
    <div id="search">
        <input @keyup.enter="$emit('perform-search')" v-model="store.searchText" type="text"
            placeholder="Inserisci testo...">
        <button @click="$emit('perform-search')">Cerca</button>
    </div>

    <div id="radio-button-group">
        <div class="radio-button">
            <input v-model="store.typeOfSearch" type="radio" name="type-of-search" value="both" id="type-of-search-both"
                checked>
            <label for="type-of-search-both">Tutto</label>
        </div>

        <div class="radio-button">
            <input v-model="store.typeOfSearch" type="radio" name="type-of-search" value="movies"
                id="type-of-search-movies">
            <label for="type-of-search-movies">Film</label>
        </div>

        <div class="radio-button">
            <input v-model="store.typeOfSearch" type="radio" name="type-of-search" value="series"
                id="type-of-search-series">
            <label for="type-of-search-series">Serie</label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#search {
    input {
        padding: .5rem;
        font-size: 1.2rem;
    }

    button {
        padding: .5rem;
        font-size: 1.2rem;
    }
}
</style>