<script>
export default {
    name: "AppCard",

    data() {
        return {

        }
    },

    props: {
        type: String,
        card: Object,
    },
}
</script>

<template>
    <ul v-if="type == 'movie'" class="card-container movie-details">
        <li class="movie-title">{{ card.title }}</li>
        <li class="movie-original-title">{{ card.original_title }}</li>
        <li class="movie-original-language">{{ card.original_language }}</li>
        <li class="movie-vote-average">{{ card.vote_average }}</li>
    </ul>

    <ul v-else class="card-container serie-details">
        <li class="movie-title">{{ card.name }}</li>
        <li class="movie-original-title">{{ card.original_name }}</li>
        <li class="movie-original-language">{{ card.original_language }}</li>
        <li class="movie-vote-average">{{ card.vote_average }}</li>
    </ul>
</template>

<style lang="scss" scoped>
.card-container {
    padding: .5rem;
    border: 1px solid white;

    list-style-type: none;
}
</style>