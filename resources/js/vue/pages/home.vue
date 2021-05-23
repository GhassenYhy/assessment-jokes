<template>
    <div>
        <h5>Jokes loader</h5>
        <div class="input-field col s6">
            <input v-on:input="textFilter = $event.target.value" placeholder="Seach for text" id="first_name" type="text" class="validate">
        </div>
        <p>
            <label>
                <input  @click="selectAll" v-model="allSelected" type="checkbox" />
                <span style="padding-right: 10px; padding-left: 25px">select all</span>
            </label>
        </p>
        <p>
            <label v-for="item in listOfCategories">
                <input v-model="checkedCategories" @click="select(item.id)" :value="item.id" type="checkbox" />
                <span style="padding-right: 10px; padding-left: 25px">{{item.value}}</span>
            </label>
        </p>
        <div class="card horizontal orange lighten-1" style="place-content: center">
            <a v-on:click="reFetch()" class="btn-flat">Refetch Jokes</a>
        </div>

        <div class="col s12" v-for="item in listOfJokes" v-if="!loading">
            <div class="card horizontal">
                <div class="card-stacked">
                    <div class="card-content">
                        <p>{{item.value}}</p>
                    </div>
                    <div class="card-action">
                        <a href="#" @click="saveToLocal(item)">Add to favorites</a>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" style="text-align: center">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>

                <div class="spinner-layer spinner-red">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>

                <div class="spinner-layer spinner-yellow">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>

                <div class="spinner-layer spinner-green">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    name: "home",
    data() {
        return {
            listOfJokes:[],
            listOfCategories: [],
            checkedCategories: [],
            favoriteJokes: [],
            jokesCounter: 10,
            allSelected: false,
            loading: false,
            textFilter: String,
        }
    },

    created() {
        this.textFilter = '';
        this.loading = true;
        axios.get('api/categories').then(value => {
            console.log(value.data);
            value.data.forEach((value)=>{
                this.listOfCategories.push(
                    {
                        id:value,
                        value: value
                    }
                )
            })
            console.log(this.listOfCategories);
            this.loading = false
        });
        this.reFetch();
    },
    methods: {
        reFetch(){
            console.log(this.textFilter);
            this.loading = true;
            axios.get('api/jokes', { params: { categories: this.checkedCategories.toString(), query: this.textFilter } }).then(value => {
                this.listOfJokes = value.data
                this.loading = false
            })
        },
        addCategory(item, event){
            this.checkedCategories.push(item)
            console.log(event.target.checked);
            if(!event.target.checked) {
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
        saveToLocal(item){
            const elem = this.refreshList();
            if (elem && elem.length>0) {
                for (let i = 0; i<elem.length; i++) {
                    if (elem[i].id === item.id) {
                        return
                    }
                }
                this.favoriteJokes.push(item);
                localStorage.setItem('Favorite', JSON.stringify(this.favoriteJokes))
            } else {
                this.favoriteJokes.push(item);
                localStorage.setItem('Favorite', JSON.stringify(this.favoriteJokes))
            }
        },
        refreshList() {
            return JSON.parse(localStorage.getItem("Favorite"));
        },
    }
}
</script>

