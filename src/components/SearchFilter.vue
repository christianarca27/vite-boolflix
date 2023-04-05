<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    data() {
        return {
            store,

            genresList: [],

            areActive: [],
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
                this.areActive[i] = false;
            }
        });
    },

    methods: {
        filter() {
            let activeFilters = [];

            this.areActive.forEach((state, index) => {
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
                this.areActive[i] = false;
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
    <div class="container">
        <h4>Filtri pagina</h4>

        <ul id="filters">
            <li v-for="(genre, index) in genresList" class="filter">
                <input v-model="areActive[index]" type="checkbox" :name="genre.name" :id="type + '_' + genre.name">
                <label :for="type + '_' + genre.name">{{ genre.name }}</label>
            </li>
        </ul>

        <div id="filter-buttons">
            <button @click="filter()">Filtra pagina risultati</button>
            <button @click="removeFilter()">Rimuovi filtri</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid white;
    border-radius: 10px;

    #filters {
        height: 8vh;
        margin-bottom: 1rem;

        display: flex;
        flex-flow: column wrap;
        justify-content: space-between;

        list-style-type: none;

        .filter {
            input {
                margin-right: .5rem;
                cursor: pointer;
            }

            label {
                cursor: pointer;
            }
        }
    }

    #filter-buttons {
        display: flex;
        gap: 1rem
    }
}
</style>