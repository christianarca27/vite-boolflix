import { reactive } from "vue";

export const store = reactive({
    searchText: "",

    movies: [],

    series: [],

    queryBasicUrl: "https://api.themoviedb.org/3/",

    APIkey: "?api_key=c0ba2ef7e9812c1f27d4220dc7f1ea71",

    queryLang: "&language=it",
});