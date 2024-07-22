<script>
import { RouterLink, RouterView } from 'vue-router'

export default{
    components:{
        RouterLink
    },
}
</script>

<template>
    <div class="headerArea">
        <RouterLink class = "routeItem"  to="/">Home</RouterLink>
        <RouterLink class = "routeItem"  to="/Questionnaire">問卷</RouterLink>
    </div>    
</template>

<style scoped lang = "scss">
.headerArea{
    width: 100%;
    height: 100%;
    background-color: #FFF5E1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .routeItem{
        margin: 0 5%;
        font-size: 25px;
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
} 
</style>
