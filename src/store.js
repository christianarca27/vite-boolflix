import { reactive } from "vue";

export const store = reactive({
    searchText: "",

    movies: [],

    filteredMovies: [],

    isMovieFiltered: false,

    totalMoviesPages: 0,

    actualMoviesPage: 0,

    isMoviesReady: false,

    series: [],

    filteredSeries: [],

    isSeriesFiltered: false,

    totalSeriesPages: 0,

    actualSeriesPage: 0,

    isSeriesReady: false,

    typeOfSearch: "both",

    queryBasicUrl: "https://api.themoviedb.org/3",

    querySearchType: "/search/movie",

    APIkey: "?api_key=c0ba2ef7e9812c1f27d4220dc7f1ea71",

    queryLang: "&language=it",

    isJumboCardActive: false,

    selectedCard: null,

    typeOfSelectedCard: "",
});