<script>
import { store } from './store.js';

export default {
  data() {
    return {
      store,
    }
  },
}
</script>

<template>
  {{ store.searchText }}
</template>

<style lang="scss" scoped></style>
