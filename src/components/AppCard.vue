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
        <li class="card-poster">
            <img v-if="card.poster_path != null" :src="'https://image.tmdb.org/t/p/original' + card.poster_path" alt="">

            <div v-else class="poster-not-avaible">
                <p>Poster non disponibile</p>
            </div>
        </li>

        <li class="card-title">
            <h3>{{ card.title }}</h3>
        </li>

        <li class="card-original-title">
            <small>{{ card.original_title }}</small>
        </li>

        <div class="card-original-language">
            <p>Lingua originale: </p>
            <lang-flag :iso="card.original_language" />
        </div>

        <li class="card-vote-average">
            <p>Voto:</p>
            <p>{{ card.vote_average }}</p>
        </li>
    </ul>

    <ul v-else class="card-container serie-details">
        <li class="card-poster">
            <img v-if="card.poster_path != null" :src="'https://image.tmdb.org/t/p/original' + card.poster_path" alt="">

            <div v-else class="poster-not-avaible">
                <p>Poster non disponibile</p>
            </div>
        </li>

        <li class="card-title">
            <h3>{{ card.name }}</h3>
        </li>

        <li class="card-original-title">
            <small>{{ card.original_name }}</small>
        </li>

        <div class="card-original-language">
            <p>Lingua originale: </p>
            <lang-flag :iso="card.original_language" />
        </div>

        <li class="card-vote-average">
            <p>Voto:</p>
            <p>{{ card.vote_average }}</p>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.card-container {
    border: 1px solid white;

    list-style-type: none;

    li {
        margin-bottom: .5rem;
    }

    .card-poster {

        img {
            width: 250px;
            aspect-ratio: 2 / 3;

            object-fit: cover;
        }

        .poster-not-avaible {
            background-color: black;
            width: 250px;
            aspect-ratio: 2 / 3;

            display: flex;
            justify-content: center;
            align-items: center;
        }
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