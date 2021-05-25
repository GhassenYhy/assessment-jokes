<template>
    <ul class="navbar">
        <li><router-link to="/">Home</router-link></li>
        <li>&ensp;/&ensp;</li>
        <li><router-link to="/fav">Favorites</router-link></li>
    </ul>
</template>

<script>
export default {
name: "menuItems"
}
</script>

<style scoped>
.navbar {
    display: flex;
    padding-right: 10px
}
</style>
