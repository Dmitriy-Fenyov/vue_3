<template>
    <div>
        <h3>Список пользователей</h3>
    </div>
        <post-item v-for="post in posts" :post="post" />
</template>

<script>
import PostItem from './PostItem.vue';
export default {
    components: {PostItem},
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
}


</style>