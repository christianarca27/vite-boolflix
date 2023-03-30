<script>
export default {
    name: "AppCard",

    data() {
        return {

        }
    },

    props: {
        movie: Object,
    },
}
</script>

<template>
    <ul id="card-container">
        <li class="movie-title">{{ movie.title }}</li>
        <li class="movie-original-title">{{ movie.original_title }}</li>
        <li class="movie-original-language">{{ movie.original_language }}</li>
        <li class="movie-vote-average">{{ movie.vote_average }}</li>
    </ul>
</template>

<style lang="scss" scoped>
#card-container {
    width: 200px;
    height: 300px;
    padding: .5rem;
    border: 1px solid white;

    list-style-type: none;
}
</style>