import { reactive } from "vue";

export const store = reactive({
    searchText: "",

    movies: [],

    series: [],

    totalResultPages: 0,

    actualPage: 0,

    typeOfSearch: "both",

    queryBasicUrl: "https://api.themoviedb.org/3",

    querySearchType: "/search/movie",

    APIkey: "?api_key=c0ba2ef7e9812c1f27d4220dc7f1ea71",

    queryLang: "&language=it",

    isLoading: false,
});