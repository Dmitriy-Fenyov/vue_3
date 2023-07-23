<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <MyInput v-model="searchQuery" placeholder="Поиск..."></MyInput>
        <div class="app__btns">
            <MyButton @click="showDialog">
            Создать пост
        </MyButton>
        <MySelect v-model="selectedSort" :options="sortOptions">
        </MySelect>
        </div>
        <MyDialog v-model:show="dialogVisible" >
            <PostForm @create="createPost"/>
        </MyDialog>
        <PostList :posts="sortedAndSearchPosts" @remove="removePost" v-if="!isPostsLoading"/>
        <div v-else>
            Идет загрузка...
        </div>
        <div ref="observer" class="observer"></div>
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
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name:'По названию'},
                {value: 'body', name:'По содержанию'},
            ]
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
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    { params: {
                        _page: this.page,
                        _limit: this.limit
                    }
            });
                this.totalPages = Math.ceil(response.headers['x-total-count']/ this.limit)
                this.posts = response.data;
            } 
            catch (e) {
                alert('ошибка')
            } finally {
                this.isPostsLoading = false;
            }
        },
        async loadMorePosts() {
            try {
                this.page +=1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    { params: {
                        _page: this.page,
                        _limit: this.limit
                    }
            });
                this.totalPages = Math.ceil(response.headers['x-total-count']/ this.limit)
                this.posts = [...this.posts, ...response.data];
            } 
            catch (e) {
                alert('ошибка')
            } 
        }
    },
    mounted() {
        this.fetchPosts();
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePosts()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
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
