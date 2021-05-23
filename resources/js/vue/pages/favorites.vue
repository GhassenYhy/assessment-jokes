<template>
    <div>
        <h5>List of your favorites</h5>
        <div v-if="listOfFavorites && listOfFavorites.length === 0">
            <h6>
                You have no favorites to display...
            </h6>
        </div>
        <div class="col s12" v-for="item in listOfFavorites">
            <div class="card horizontal">
                <div class="card-stacked">
                    <div class="card-content">
                        <p>{{ item.value }}</p>
                    </div>
                    <div class="card-action">
                        <a :style="{ cursor: 'pointer'}" @click="removeItem(item)">Remove from list</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "favorites",
    data() {
        return {
            listOfFavorites: [],
        }
    },
    created() {
        this.refreshList();
    },
    methods: {
        refreshList() {
            const elem = JSON.parse(localStorage.getItem("Favorite"))
            return this.listOfFavorites = elem;
        },
        removeItem(item) {
            this.listOfFavorites = this.listOfFavorites.filter((value) => {
                return value.id !== item.id;
            });
            localStorage.setItem('Favorite', JSON.stringify(this.listOfFavorites));
            this.refreshList();
        }
    }

}
</script>

<style scoped>

</style>
