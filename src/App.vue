<script>
import AppHeader from './components/AppHeader.vue';
import { store } from './store.js';

export default {
  data() {
    return {
      store,
    };
  },
  components: {
    AppHeader
  }
}
</script>

<template>
  <AppHeader></AppHeader>
</template>

<style lang="scss" scoped></style>
