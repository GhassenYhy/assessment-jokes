<template>
    <div class="container">
        <ul style="display: flex; padding-right: 10px">
            <li><router-link to="/">Home</router-link></li>
            <li>&ensp;/&ensp;</li>
            <li><router-link to="/fav">Favorites</router-link></li>
        </ul>
    <router-view/>
     </div>
</template>

<script>
export default {
}
</script>

