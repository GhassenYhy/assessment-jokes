<template>
    <div class="container">
        <div class="input-field col s6">
            <input placeholder="Seach for text" id="first_name" type="text" class="validate">
        </div>
        <p>
            <label v-for="item in listOfCategories">
                <input type="checkbox" />
                <span style="padding-right: 10px; padding-left: 25px">{{item}}</span>
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
                        <a href="#">Add to favorites</a>
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
    data() {
        return {
            listOfJokes:[],
            listOfCategories: [],
            jokesCounter: 10,
            loading: false,
        }
    },

    created() {
        this.loading = true;
        axios.get('api/categories').then(value => {
            this.listOfCategories = value.data;
            console.log(this.listOfCategories);
            this.loading = false
        })
    },
    methods: {
        reFetch(){
            this.loading = true;
            axios.get('api/jokes', { params: { categories: 'political,dev', query: 'FATAL' } }).then(value => {
                this.listOfJokes = value.data
                this.loading = false
            })
        }
    }
}
</script>

