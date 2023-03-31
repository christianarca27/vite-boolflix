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
    };
  },

  components: {
    AppHeader,
    AppMain,
  },

  methods: {
    performSearch() {
      this.store.isLoading = true;
      this.store.movies = [];
      let completedQuery = this.store.queryBasicUrl + this.store.querySearchType + this.store.APIkey + this.store.queryLang + "&query=" + encodeURIComponent(this.store.searchText) + "&page=" + this.store.actualPage;

      axios.get(completedQuery)
        .then((res) => {
          this.store.totalResultPages = res.data.total_pages;
          this.store.movies = res.data.results;
          this.store.isLoading = false;
        });
    },

    performFirstSearch() {
      this.store.actualPage = 1;
      this.performSearch();
    },

    prevPageSearch() {
      if (this.store.actualPage > 1) {
        this.store.actualPage--;
        this.performSearch();
      }
    },

    nextPageSearch() {
      if (this.store.actualPage < this.store.totalResultPages) {
        this.store.actualPage++;
        this.performSearch();
      }
    },
  },
}
</script>

<template>
  <AppHeader @perform-search="performFirstSearch()"></AppHeader>

  <AppMain @prev-page-search="prevPageSearch()" @next-page-search="nextPageSearch()"></AppMain>
</template>

<style lang="scss" scoped></style>
