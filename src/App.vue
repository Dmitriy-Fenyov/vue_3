<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <MyButton @click="showDialog" style="margin: 15px 0;">
            Создать пост
        </MyButton>
        <MyDialog v-model:show="dialogVisible" >
            <PostForm @create="createPost"/>
        </MyDialog>
        <PostList :posts="posts" @remove="removePost"/>
    </div>
</template>

<script>
import PostForm from "./components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "./components/UI/MyDialog";
import MyButton from "./components/UI/MyButton";
export default {
    components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton
},

    data() {
        return {
            posts: [
                {id: 1, title: 'Урок 1', body: 'Тема урока 1'},
                {id: 2, title: 'Урок 2', body: 'Тема урока 2'},
                {id: 3, title: 'Урок 3', body: 'Тема урока 3'},
            ],
            dialogVisible: false,
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true;
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
