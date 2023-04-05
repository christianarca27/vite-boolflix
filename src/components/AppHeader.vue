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
    <header>
        <div id="header-inner" class="container">
            <a id="logo" href="index.html">
                <h1>Boolflix</h1>
            </a>

            <div id="search">
                <input @keyup.enter="$emit('perform-search')" v-model="store.searchText" type="text"
                    placeholder="Inserisci testo...">

                <div id="radio-button-group">
                    <div class="radio-button">
                        <input v-model="store.typeOfSearch" type="radio" name="type-of-search" value="both"
                            id="type-of-search-both" checked>
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

                <button @click="$emit('perform-search')">Cerca</button>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
#header-inner {
    display: flex;
    justify-content: space-between;

    #logo {
        text-decoration: none;
        color: red;
        font-size: 2rem;
    }

    #search {
        display: flex;
        align-items: center;
        gap: 1rem;

        input {
            padding: .5rem;
            margin-right: .5rem;
            font-size: 1.2rem;
        }

        #radio-button-group {
            display: flex;
            gap: 1rem;
        }
    }
}
</style>