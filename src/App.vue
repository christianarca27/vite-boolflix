<script>
import AppHeader from './components/AppHeader.vue';
import { store } from './store.js';
import axios from 'axios';

export default {
  name: "App",

  data() {
    return {
      store,
    };
  },

  components: {
    AppHeader
  },

  methods: {
    search() {
      console.log("emit");
    },
  },
}
</script>

<template>
  <AppHeader @search="search()"></AppHeader>
</template>

<style lang="scss" scoped></style>
