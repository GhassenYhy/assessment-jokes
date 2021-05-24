export default function getJokes(categories, query) {
    axios.get('api/jokes', { params: { categories: categories, query: query } }).then(value => {
        return value.data;
    }).catch(reason => {
        return {
            error: reason
        }
    })
}

