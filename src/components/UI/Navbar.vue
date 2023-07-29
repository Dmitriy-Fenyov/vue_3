<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            <MyButton @click="$router.push('/posts')">Посты</MyButton>
            <MyButton style="margin-left: 20px;" @click="$router.push('/about')">О сайте</MyButton>
            <MyButton style="margin-left: 20px;" @click="$router.push('/store')">Store</MyButton>
            <MyButton style="margin-left: 20px;" @click="$router.push('/compositon')">Compositon</MyButton>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton';
export default {
    components: { MyButton }
}
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: lightgrey;;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.navbar__btns {
    margin-left: auto;
}
</style>