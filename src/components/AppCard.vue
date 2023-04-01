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
    <div class="card-wrapper">
        <div class="card-poster">
            <img v-if="card.poster_path != null" :src="'https://image.tmdb.org/t/p/original' + card.poster_path" alt="">

            <div v-else class="poster-not-avaible">
                <p>Poster non disponibile</p>
            </div>
        </div>

        <ul class="card-details">
            <li class="card-title">
                <strong v-if="type == 'movie'">{{ card.title }}</strong>
                <strong v-else>{{ card.name }}</strong>
            </li>

            <li class="card-original-title">
                <small v-if="type == 'movie'">{{ card.original_title }}</small>
                <small v-else>{{ card.original_name }}</small>
            </li>

            <div class="card-original-language">
                <h3>Lingua originale: </h3>
                <lang-flag :iso="card.original_language" />
            </div>

            <li class="card-vote-average">
                <h3>Voto:</h3>
                <i v-for="(star, index) in 5" :class="index < parseInt(card.vote_average / 2) ? 'fa-solid' : 'fa-regular'"
                    class="fa-star"></i>
            </li>

            <li class="card-overview">
                <h3>Overview</h3>
                <p>{{ card.overview }}</p>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.card-wrapper {
    width: calc(100% / 5 - 10px * 4 / 5);
    // margin-right: 1rem;
    cursor: pointer;

    .card-poster {
        width: 100%;

        img {
            width: 100%;
            aspect-ratio: 2 / 3;

            object-fit: cover;
        }

        .poster-not-avaible {
            background-color: black;
            width: 100%;
            aspect-ratio: 2 / 3;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    ul.card-details {
        background-color: #141414;
        display: none;
        width: 100%;
        aspect-ratio: 2 / 3;
        padding: 1rem;
        list-style-type: none;
        overflow-y: auto;

        li {
            margin-bottom: .5rem;
        }

        .card-title {
            strong {
                font-size: 1.5rem;
            }
        }

        .card-original-language {
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

        .card-vote-average i {
            color: goldenrod;
        }
    }

    &:hover .card-poster {
        display: none;
    }

    &:hover .card-details {
        display: block;
    }
}
</style>