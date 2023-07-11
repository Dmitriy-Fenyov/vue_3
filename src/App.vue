<template>
    <div class="app">
        <PostForm @create="createPost"/>
        <PostList :posts="posts"/>
    </div>
</template>

<script>
import PostForm from "./components/PostForm";
import PostList from "@/components/PostList";

export default {
    components: {
PostForm, PostList
    },

    data() {
        return {
            posts: [
                {id: 1, title: 'Урок 1', body: 'Тема урока 1'},
                {id: 1, title: 'Урок 2', body: 'Тема урока 2'},
                {id: 1, title: 'Урок 3', body: 'Тема урока 3'},
            ],
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
        }

    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}

</style>
