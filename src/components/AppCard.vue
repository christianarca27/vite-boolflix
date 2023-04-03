<script>
import LangFlag from 'vue-lang-code-flags';
import axios from 'axios';
import { store } from '../store';

export default {
    name: "AppCard",

    data() {
        return {
            store,

            isActive: false,

            cast: [],

            genres: [],
        }
    },

    methods: {
        showMore() {
            this.isActive = true;

            let queryGenres;
            let queryCredits;
            if (this.type == 'movie') {
                queryGenres = this.store.queryBasicUrl + "/movie/" + this.card.id + this.store.APIkey + this.store.queryLang;
                queryCredits = this.store.queryBasicUrl + "/movie/" + this.card.id + "/credits" + this.store.APIkey + this.store.queryLang;
            }
            else {
                queryGenres = this.store.queryBasicUrl + "/tv/" + this.card.id + this.store.APIkey + this.store.queryLang;
                queryCredits = this.store.queryBasicUrl + "/tv/" + this.card.id + "/credits" + this.store.APIkey + this.store.queryLang;
            }

            axios.get(queryGenres).then((res) => {
                this.genres = res.data.genres;
            });
            axios.get(queryCredits).then((res) => {
                this.cast = res.data.cast;
            });
        },

        showLess() {
            this.isActive = false;
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
        voteAverage0to5() {
            return parseInt(this.card.vote_average / 2);
        },
    },
}
</script>

<template>
    <div @click="showMore()" class="card">
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

            <li class="card-original-language">
                <h3>Lingua originale: </h3>
                <lang-flag :iso="card.original_language" />
            </li>

            <li class="card-vote-average">
                <h3>Voto:</h3>
                <i v-for="(star, index) in 5" :class="index < voteAverage0to5 ? 'fa-solid' : 'fa-regular'"
                    class="fa-star"></i>
            </li>

            <li class="card-overview">
                <h3>Overview</h3>
                <p>{{ card.overview }}</p>
            </li>
        </ul>
    </div>

    <div v-if="isActive" class="card-xl">
        <div @click="showLess()" class="close-details">
            <i class="fa-solid fa-circle-xmark"></i>
        </div>

        <div class="card-xl-poster">
            <img v-if="card.poster_path != null" :src="'https://image.tmdb.org/t/p/original' + card.poster_path" alt="">

            <div v-else class="poster-not-avaible">
                <p>Poster non disponibile</p>
            </div>
        </div>

        <ul class="card-xl-details">
            <li class="card-title">
                <strong v-if="type == 'movie'">{{ card.title }}</strong>
                <strong v-else>{{ card.name }}</strong>
            </li>

            <li class="card-original-title">
                <small v-if="type == 'movie'">{{ card.original_title }}</small>
                <small v-else>{{ card.original_name }}</small>
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
                    <li v-for="(actor, index) in cast" v-show="index < 5">{{ actor.name }}</li>
                </ul>
            </li>

            <li class="card-original-language">
                <h3>Lingua originale: </h3>
                <lang-flag :iso="card.original_language" />
            </li>

            <li class="card-vote-average">
                <h3>Voto:</h3>
                <i v-for="(star, index) in 5" :class="index < voteAverage0to5 ? 'fa-solid' : 'fa-regular'"
                    class="fa-star"></i>
            </li>

            <li class="card-overview">
                <h3>Overview</h3>
                <p>{{ card.overview }}</p>
            </li>
        </ul>
    </div>
</template>W

<style lang="scss" scoped>
.card {
    width: calc(100% / 5 - 10px * 4 / 5);
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

    .card-details {
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

.card-xl {
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
    overflow-y: auto;

    .close-details {
        padding: 2rem;

        position: absolute;
        top: 0;
        right: 0;

        color: black;
        font-size: 2rem;
        cursor: pointer;

        &:hover {
            color: white;
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
    }

    .card-xl-details {
        width: 100%;
        height: 50%;
        padding: 2rem;
        list-style-type: none;

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