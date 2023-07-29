<template>
    <div>
        <h1>Страница с постами</h1>
        <MyInput v-model="searchQuery" placeholder="Поиск..."></MyInput>
        <div class="app__btns">
            <MyButton @click="showDialog">
                Создать пост
            </MyButton>
            <MySelect v-model="selectedSort" :options="sortOptions">
            </MySelect>
        </div>
        <MyDialog >
            <PostForm />
        </MyDialog>
        <PostList :posts="sortedAndSearchPosts" v-if="!isPostsLoading"/>
        <div v-else>
            Идет загрузка...
        </div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import axios from "axios";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchPosts from "@/hooks/useSortedAndSearchPosts";


export default {
    components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
    MySelect,
    MyInput
},

    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name:'По названию'},
                {value: 'body', name:'По содержанию'},
            ]
        }
    },
    setup(props) {
        const {posts, isPostsLoading, totalPages } = usePosts(10);
        const {sortedPosts, selectedSort} = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchPosts} = useSortedAndSearchPosts(sortedPosts);
        return {
            posts,
            totalPages,
            isPostsLoading,
            sortedPosts, 
            selectedSort,
            searchQuery, 
            sortedAndSearchPosts
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

.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.observer {
    height: 20px;
}
</style>
