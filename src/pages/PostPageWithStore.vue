<template>
    <div>
        <h1>Страница с постами</h1>
        <MyInput :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..."></MyInput>
        <div class="app__btns">
            <MyButton @click="showDialog">
            Создать пост
        </MyButton>
        <MySelect :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"></MySelect>
        </div>
        <MyDialog v-model:show="dialogVisible" >
            <PostForm @create="createPost"/>
        </MyDialog>
        <PostList :posts="sortedAndSearchPosts" @remove="removePost" v-if="!isPostsLoading"/>
        <div v-else>
            Идет загрузка...
        </div>
        <div v-intersection="loadMorePosts" class="observer"></div>
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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
    components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
    MySelect,
    MyInput,
},

    data() {
        return {
            posts: [],
            dialogVisible: false,   
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true;
        },
        
    },
    mounted() {
        this.fetchPosts();
        
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchPosts: 'post/sortedAndSearchPosts'
        })
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
