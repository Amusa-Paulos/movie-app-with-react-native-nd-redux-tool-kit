import { DETAILS_ENDPOINT, LATEST_MOVIES_ENDPOINT, SEARCH_MOVIES_ENDPOINT, axios_instance } from "./constants"

export const fetch_movies = async (page: number) => {
    return await axios_instance.get(LATEST_MOVIES_ENDPOINT+page)
    .then(data => data.data)
    .catch(err => undefined)
}

export const movie_detail = async (movie_id: number) => {
    return await axios_instance.get(DETAILS_ENDPOINT+movie_id)
    .then(data => data.data)
    .catch(err => undefined)
}

export const search_movies = async (query: string, page: number) => {
    console.log("query:", query, "page:", page);
    
    return await axios_instance.get(SEARCH_MOVIES_ENDPOINT + query + '&page='+page)
    .then(data => data.data)
    .catch(err => undefined)
}