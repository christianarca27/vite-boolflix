<script>
import axios from 'axios';
import { store } from '../store';
import LangFlag from 'vue-lang-code-flags';

export default {
    data() {
        return {
            store,

            genres: [],

            credits: [],
        }
    },

    components: {
        LangFlag,
    },

    created() {
        let queryGenres;
        let queryCredits;

        if (this.store.typeOfSelectedCard == 'movie') {
            queryGenres = this.store.queryBasicUrl + "/movie/" + this.store.selectedCard.id + this.store.APIkey + this.store.queryLang;
            queryCredits = this.store.queryBasicUrl + "/movie/" + this.store.selectedCard.id + "/credits" + this.store.APIkey + this.store.queryLang;
        }
        else {
            queryGenres = this.store.queryBasicUrl + "/tv/" + this.store.selectedCard.id + this.store.APIkey + this.store.queryLang;
            queryCredits = this.store.queryBasicUrl + "/tv/" + this.store.selectedCard.id + "/credits" + this.store.APIkey + this.store.queryLang;
        }

        axios.get(queryGenres).then((res) => {
            this.genres = res.data.genres;
        });
        axios.get(queryCredits).then((res) => {
            this.credits = res.data.cast;
        });
    },

    computed: {
        starRating() {
            return parseInt(this.store.selectedCard.vote_average / 2);
        },

        posterPath() {
            return "https://image.tmdb.org/t/p/" + "original" + this.store.selectedCard.poster_path;
        },
    },

    methods: {
        showLess() {
            this.store.isJumboCardActive = false;
        },
    }
}
</script>

<template>
    <div class="jumbo-card">
        <div class="close-details">
            <i @click="showLess()" class="fa-solid fa-circle-xmark"></i>
        </div>

        <div class="card-xl-poster">
            <img v-if="store.selectedCard.poster_path != null" :src="posterPath" alt="">
            <div v-else class="poster-not-available">
                <p>Poster non disponibile</p>
            </div>
        </div>

        <ul class="card-xl-details">
            <li class="card-title">
                <strong v-if="store.typeOfSelectedCard == 'movie'">{{ store.selectedCard.title }}</strong>
                <strong v-else>{{ store.selectedCard.name }}</strong>
            </li>

            <li class="card-original-title">
                <small v-if="store.typeOfSelectedCard == 'movie'">{{ store.selectedCard.original_title }}</small>
                <small v-else>{{ store.selectedCard.original_name }}</small>
            </li>

            <li class="card-genres">
                <h3>Genere:</h3>
                <ul>
                    <li v-for="genre in genres">{{ genre.name }}</li>
                </ul>
            </li>

            <li class="card-cast">
                <h3>Cast:</h3>
                <ul>
                    <li v-for="(actor, index) in credits" v-show="index < 5">{{ actor.name }}</li>
                </ul>
            </li>

            <li class="card-original-language">
                <h3>Lingua originale: </h3>
                <lang-flag :iso="store.selectedCard.original_language" />
            </li>

            <li class="card-vote-average">
                <h3>Voto:</h3>
                <i v-for="number in 5" :class="number <= starRating ? 'fa-solid' : 'fa-regular'" class="fa-star"></i>
            </li>

            <li class="card-overview">
                <h3>Overview</h3>
                <p>{{ store.selectedCard.overview }}</p>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.jumbo-card {
    background-color: black;
    width: 90vw;
    height: 90vh;
    border-radius: 20px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    list-style-type: none;
    overflow-y: hidden;

    .close-details {
        padding: 1rem 1rem 2rem 2rem;

        position: absolute;
        top: 0;
        right: 0;

        color: white;
        font-size: 2rem;

        i {
            border-radius: 50%;
            cursor: pointer;
        }

        &:hover i {
            background-color: red;
            box-shadow: red 0 0 50px;
            color: black;
        }
    }

    .card-xl-poster {
        width: 100%;
        height: 50%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
        }

        .poster-not-available {
            width: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .card-xl-details {
        width: 100%;
        height: 50%;
        padding: 2rem;
        list-style-type: none;
        overflow-y: auto;

        .card-title {
            strong {
                font-size: 3rem;
            }
        }

        .card-original-title {
            small {
                font-size: 1.5rem;
            }
        }

        .card-genres {
            display: flex;
            gap: 1rem;

            ul {
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                gap: 1rem;
                list-style-type: none;
            }
        }

        .card-cast {
            display: flex;
            gap: 1rem;

            ul {
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                gap: 1rem;
                list-style-type: none;
            }
        }

        .card-overview {
            padding-bottom: 2rem;
        }
    }
}
</style>