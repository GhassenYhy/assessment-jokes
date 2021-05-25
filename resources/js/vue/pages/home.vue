<template>
    <div>
        <h5>Jokes loader</h5>
        <div v-if="this.maxReached" class="card-panel deep-orange lighten-2">You can't add more than 5 jokes to your favorites.</div>

        <div class="input-field col s6">
            <input v-on:input="textFilter = $event.target.value" placeholder="Seach for text" id="first_name"
                   type="text" class="validate">
        </div>
        <p>
            <label>
                <input @click="selectAll" v-model="allSelected" type="checkbox"/>
                <span class="checkboxes">select all</span>
            </label>
        </p>
        <p>
            <label v-for="item in listOfCategories">
                <input v-model="checkedCategories" @click="select(item.id)" :value="item.id" type="checkbox"/>
                <span class="checkboxes">{{ item.value }}</span>
            </label>
        </p>
        <div class="card horizontal orange lighten-1 centered">
            <a v-on:click="reFetch()" class="btn-flat">Refetch Jokes</a>
        </div>

        <div class="col s12" v-for="item in listOfJokes" v-if="!loading">
            <div class="card horizontal">
                <div class="card-stacked">
                    <div class="card-content">
                        <p>{{ item.value }}</p>
                    </div>
                    <div v-if="checkExisting(item)" class="card-action">
                        <a href="#" @click="saveToLocal(item)">Add to favorites</a>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" style="text-align: center">
            <loader/>
        </div>

    </div>

</template>

<script>

import {getJokes, getCategories} from "../services/apis"
import Loader from "../components/loader"

export default {
    name: "home",
    components: {
        Loader
    },
    data() {
        return {
            listOfJokes: [],
            listOfCategories: [],
            checkedCategories: [],
            favoriteJokes: [],
            allSelected: false,
            loading: false,
            textFilter: String,
            maxReached: false,
        }
    },

    created() {
        this.favoriteJokes = this.refreshList();
        this.textFilter = '';
        this.loading = true;
        getCategories().then(value => {
            value["data"].forEach((value) => {
                this.listOfCategories.push(
                    {
                        id: value,
                        value: value
                    }
                )
            })
            this.loading = false
        });
        this.reFetch();
    },
    methods: {
        async reFetch() {
            this.loading = true;
            await getJokes(this.checkedCategories.toString(), this.textFilter).then(value => {
                this.listOfJokes = value
            })
            this.loading = false
        },
        addCategory(item, event) {
            this.checkedCategories.push(item)
            if (!event.target.checked) {
                this.checkedCategories = this.checkedCategories.filter(e => e !== item);
            }
        },
        selectAll() {
            this.allSelected = !this.allSelected;
            this.checkedCategories = [];

            if (this.allSelected) {
                for (let category in this.listOfCategories) {
                    this.checkedCategories.push(this.listOfCategories[category].id.toString());
                }
            }
        },
        select() {
            this.allSelected = false;
        },
        saveToLocal(item) {
            this.maxReached = false;
            const elem = this.refreshList();
            if (elem && elem.length >= 0 && elem.length < 5) {
                for (let i = 0; i < elem.length; i++) {
                    if (elem[i].id === item.id) {
                        return
                    }
                }
                this.favoriteJokes.push(item);
                localStorage.setItem('Favorite', JSON.stringify(this.favoriteJokes))
            } else if (elem.length === 5) {
                this.maxReached = true
            }
        },
        refreshList() {
            return JSON.parse(localStorage.getItem("Favorite")) ? JSON.parse(localStorage.getItem("Favorite")) : [];
        },
        checkExisting(item) {
            return !(this.favoriteJokes.map(value => value.id).indexOf(item.id) >= 0);
        }
    }
}
</script>

<style scoped>

.checkboxes {
    padding-right: 10px;
    padding-left: 25px
}
.centered {
    place-content: center
}

</style>
