<script>
import LangFlag from 'vue-lang-code-flags';
import { store } from '../store';

export default {
    name: "AppCard",

    data() {
        return {
            store,

            isActive: false,
        }
    },

    props: {
        type: String,
        card: Object,
    },

    components: {
        LangFlag,
    },

    computed: {
        starRating() {
            return parseInt(this.card.vote_average / 2);
        },

        posterPath() {
            return "https://image.tmdb.org/t/p/" + "original" + this.card.poster_path;
        }
    },

    methods: {
        moreDetails() {
            store.selectedCard = this.card;
            store.typeOfSelectedCard = this.type;
            store.isJumboCardActive = true;
        },
    },
}
</script>

<template>
    <li @click="moreDetails()" class="card">
        <div class="card-poster">
            <img v-if="card.poster_path != null" :src="posterPath" alt="">

            <div v-else class="poster-not-available">
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

            <li class="card-original-language">
                <h3>Lingua originale: </h3>
                <lang-flag :iso="card.original_language" />
            </li>

            <li class="card-vote-average">
                <h3>Voto:</h3>
                <i v-for="number in 5" :class="number <= starRating ? 'fa-solid' : 'fa-regular'" class="fa-star"></i>
            </li>

            <li class="card-overview">
                <h3>Overview</h3>
                <p>{{ card.overview }}</p>
            </li>
        </ul>
    </li>
</template>W

<style lang="scss" scoped>
.card {
    width: calc(100% / 5 - 10px * 4 / 5);
    flex-shrink: 0;
    cursor: pointer;

    .card-poster {
        width: 100%;

        img {
            width: 100%;
            aspect-ratio: 2 / 3;
            border-radius: 5px;

            object-fit: cover;
        }

        .poster-not-available {
            background-color: black;
            width: 100%;
            aspect-ratio: 2 / 3;
            border-radius: 5px;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .card-details {
        background-color: #141414;
        display: none;
        width: 100%;
        aspect-ratio: 2 / 3;
        padding: 1rem;
        border-radius: 5px;
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
    }

    &:hover .card-poster {
        display: none;
    }

    &:hover .card-details {
        display: block;
    }
}
</style>