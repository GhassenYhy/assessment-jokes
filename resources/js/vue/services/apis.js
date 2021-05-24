import axios from 'axios'

export async function getJokes(categories, query) {
    return axios.get('api/jokes', {params: {categories: categories, query: query}}).then(value => {
        return value.data;
    }).catch(reason => {
        return {
            error: reason
        }
    })
}

export function getCategories() {
    return axios.get('api/categories').then(value => {
        return value
    }).catch(reason => {
        return {
            error: reason
        }
    })
}


export default {getJokes, getCategories}

