<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <TransitionGroup name="post-list">
            <post-item v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)" />
        </TransitionGroup>
    </div>
    <h2 v-else>
        Список постов пуст
    </h2>
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
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.post-list-leave-active {
    position: absolute;
}

</style>