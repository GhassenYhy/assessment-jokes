<template>
    <div class="container">
        <menu-items/>
        <router-view/>
     </div>
</template>

<script>
import MenuItems from "./components/menuItems"
export default {
    components: {
        MenuItems
    }
}
</script>

