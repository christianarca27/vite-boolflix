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

      totalResultPages: 0,
    };
  },

  components: {
    AppHeader,
    AppMain,
  },

  methods: {
    search() {
      this.store.isLoading = true;
      this.store.movies = [];
      let firstQuery = this.store.queryBasicUrl + "search/movie" + this.store.APIkey + this.store.queryLang + "&query=" + this.store.searchText;

      axios.get(firstQuery)
        .then((res) => {
          this.totalResultPages = res.data.total_pages;

          for (let i = 1; i <= this.totalResultPages; i++) {
            let singlePageQuery = firstQuery + "&page=" + i;

            axios.get(singlePageQuery)
              .then((res) => {
                this.store.movies.push(...res.data.results);
                if (i == this.totalResultPages) {
                  this.store.isLoading = false;
                }
              });
          }
        });
    },
  },
}
</script>

<template>
  <AppHeader @search="search()"></AppHeader>

  <AppMain></AppMain>
</template>

<style lang="scss" scoped></style>
