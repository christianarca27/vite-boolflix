<script>
import axios from 'axios';
import { store } from './store.js';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';

export default {
  name: "App",

  data() {
    return {
      store,

      completedQuery: "",
    };
  },

  components: {
    AppHeader,
    AppMain,
  },

  methods: {
    isSearchTextValid() {
      if (this.store.searchText == "") {
        return false;
      }
      else {
        for (let i = 0; i < this.store.searchText.length; i++) {
          if (this.store.searchText[i] != " ") {
            return true;
          }
        }
        return false;
      }
    },

    performFirstSearch() {
      if (this.isSearchTextValid()) {
        this.store.movies = [];
        this.store.actualMoviesPage = 0;
        this.store.totalMoviesPages = 0;
        this.store.series = [];
        this.store.actualSeriesPage = 0;
        this.store.totalSeriesPages = 0;

        if (this.store.typeOfSearch == "movies" || this.store.typeOfSearch == "both") {
          this.store.isMoviesReady = false;
          this.store.actualMoviesPage = 1;

          this.performSearch("movies");
        }
        if (this.store.typeOfSearch == "series" || this.store.typeOfSearch == "both") {
          this.store.isSeriesReady = false;
          this.store.actualSeriesPage = 1;

          this.performSearch("series");
        }
      }
    },

    prevMoviesPageSearch() {
      if (this.store.actualMoviesPage > 1) {
        this.store.actualMoviesPage--;
        this.performSearch("movies");
      }
    },

    nextMoviesPageSearch() {
      if (this.store.actualMoviesPage < this.store.totalMoviesPages) {
        this.store.actualMoviesPage++;
        this.performSearch("movies");
      }
    },

    prevSeriesPageSearch() {
      if (this.store.actualSeriesPage > 1) {
        this.store.actualSeriesPage--;
        this.performSearch("series");
      }
    },

    nextSeriesPageSearch() {
      if (this.store.actualSeriesPage < this.store.totalSeriesPages) {
        this.store.actualSeriesPage++;
        this.performSearch("series");
      }
    },

    performSearch(type) {
      console.log("search " + type + " started...");

      if (type == "movies") {
        this.prepareMoviesQuery();
        this.getAndStoreAPIresults(type);
      }

      if (type == "series") {
        this.prepareSeriesQuery();
        this.getAndStoreAPIresults(type);
      }
    },

    prepareMoviesQuery() {
      this.store.querySearchType = "/search/movie";
      this.completedQuery = this.store.queryBasicUrl + this.store.querySearchType + this.store.APIkey + this.store.queryLang + "&query=" + encodeURIComponent(this.store.searchText) + "&page=" + this.store.actualMoviesPage;
    },

    prepareSeriesQuery() {
      this.store.querySearchType = "/search/tv";
      this.completedQuery = this.store.queryBasicUrl + this.store.querySearchType + this.store.APIkey + this.store.queryLang + "&query=" + encodeURIComponent(this.store.searchText) + "&page=" + this.store.actualSeriesPage;
    },

    getAndStoreAPIresults(type) {
      axios.get(this.completedQuery)
        .then((res) => {
          if (type == "movies") {
            this.store.totalMoviesPages = res.data.total_pages;
            this.store.movies = res.data.results;
            this.store.isMoviesReady = true;
          }
          else if (type == "series") {
            this.store.totalSeriesPages = res.data.total_pages;
            this.store.series = res.data.results;
            this.store.isSeriesReady = true;
          }
        });
    },
  },
}
</script>

<template>
  <AppHeader @perform-search="performFirstSearch()"></AppHeader>

  <AppMain @prev-movies-page-search="prevMoviesPageSearch()" @next-movies-page-search="nextMoviesPageSearch()"
    @prev-series-page-search="prevSeriesPageSearch()" @next-series-page-search="nextSeriesPageSearch()"></AppMain>
</template>

<style lang="scss" scoped></style>
