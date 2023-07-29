import Main from "@/pages/Main"
import { createRouter, createWebHistory } from "vue-router"
import PostPage from "@/pages/PostPage"
import About from "@/pages/About"
import PostIdPage from "@/pages/PostIdPage"
import PostPageWithStore from "@/pages/PostPageWithStore"
import PostPageCompositionApi from "@/pages/PostPageCompositionApi"
const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        name: 'posts',
        component: PostIdPage
    },
    {
        path: '/store',
        component: PostPageWithStore
    },
    {
        path: '/compositon',
        component: PostPageCompositionApi
    },
    
]

const router = createRouter( {
    routes, 
    history: createWebHistory(process.env.Base_URL)})

export default router;    