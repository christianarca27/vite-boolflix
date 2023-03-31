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