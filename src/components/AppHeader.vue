<script>
import { store } from '../store.js';

export default {
    name: "AppHeader",

    data() {
        return {
            store,
        }
    },

    methods: {
        search() {
            console.log(this.store.searchText);
        },
    },
}
</script>

<template>
    <div id="search">
        <input @keyup.enter="search()" v-model="store.searchText" type="text" placeholder="Inserisci testo...">
        <button @click="search()">Cerca</button>
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