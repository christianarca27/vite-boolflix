<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    data() {
        return {
            store,

            genresList: [],

            isActive: [],
        }
    },

    props: {
        type: String,
    },

    created() {
        let query;
        if (this.type == "movie") {
            query = this.store.queryBasicUrl + "/genre/movie/list" + this.store.APIkey + this.store.queryLang;
        }
        else {
            query = this.store.queryBasicUrl + "/genre/tv/list" + this.store.APIkey + this.store.queryLang;
        }
        axios.get(query).then((res) => {
            this.genresList = res.data.genres;

            for (let i = 0; i < this.genresList.length; i++) {
                this.isActive[i] = false;
            }
        });
    },

    methods: {
        filter() {
            let activeFilters = [];

            this.isActive.forEach((state, index) => {
                if (state == true) {
                    activeFilters.push(this.genresList[index]);
                }
            });

            if (this.type == "movie") {
                this.store.filteredMovies = [];
                this.store.movies.forEach((movie) => {
                    activeFilters.forEach((filter) => {
                        if (movie.genre_ids.includes(filter.id)) {
                            if (!this.store.filteredMovies.includes(movie)) {
                                this.store.filteredMovies.push(movie);
                            }
                        }
                    });
                });
                this.store.isMovieFiltered = true;
            }
            else {
                this.store.filteredSeries = [];
                this.store.series.forEach((seriesItem) => {
                    activeFilters.forEach((filter) => {
                        if (seriesItem.genre_ids.includes(filter.id)) {
                            if (!this.store.filteredSeries.includes(seriesItem)) {
                                this.store.filteredSeries.push(seriesItem);
                            }
                        }
                    });
                });
                this.store.isSeriesFiltered = true;
            }
        },

        removeFilter() {
            for (let i = 0; i < this.genresList.length; i++) {
                this.isActive[i] = false;
            }

            if (this.type == "movie") {
                this.store.filteredMovies = [];
                this.store.isMovieFiltered = false;
            }
            else {
                this.store.filteredSeries = [];
                this.store.isSeriesFiltered = false;
            }
        },
    },
}
</script>

<template>
    <ul id="filters">
        <li v-for="(genre, index) in genresList" class="filter">
            <input v-model="isActive[index]" type="checkbox" :name="genre.name" :id="genre.name">
            <label :for="genre.name">{{ genre.name }}</label>
        </li>
    </ul>
    <button @click="filter()">Filtra pagina risultati</button>
    <button @click="removeFilter()">Rimuovi filtri</button>
</template>

<style lang="scss">
#filters {
    height: 8vh;

    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;

    list-style-type: none;

    .filter {
        input {
            margin-right: .5rem;
        }
    }
}
</style>