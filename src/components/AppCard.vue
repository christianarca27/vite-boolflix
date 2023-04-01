<script>
import LangFlag from 'vue-lang-code-flags';

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

    components: {
        LangFlag,
    }
}
</script>

<template>
    <ul v-if="type == 'movie'" class="card-container movie-details">
        <li class="movie-title">
            <h3>{{ card.title }}</h3>
        </li>

        <li class="movie-original-title">
            <small>{{ card.original_title }}</small>
        </li>

        <div class="card-original-language">
            <p>Lingua originale: </p>
            <lang-flag :iso="card.original_language" />
        </div>

        <li class="movie-vote-average">
            <p>Voto:</p>
            <p>{{ card.vote_average }}</p>
        </li>
    </ul>

    <ul v-else class="card-container serie-details">
        <li class="movie-title">
            <h3>{{ card.name }}</h3>
        </li>

        <li class="movie-original-title">
            <small>{{ card.original_name }}</small>
        </li>

        <div class="card-original-language">
            <p>Lingua originale: </p>
            <lang-flag :iso="card.original_language" />
        </div>

        <li class="movie-vote-average">
            <p>Voto:</p>
            <p>{{ card.vote_average }}</p>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.card-container {
    min-width: 200px;
    min-height: 300px;
    padding: .5rem;
    border: 1px solid white;

    list-style-type: none;

    li {
        margin-bottom: .5rem;
    }

    .flag-icon-undefined {
        width: 0;
        height: 0;

        &::before {
            content: '\3f';
            font-weight: bold;
            font-size: 1.5rem;
        }
    }
}
</style>