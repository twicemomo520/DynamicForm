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
        <RouterLink class = "routeItem"  to="/">首頁</RouterLink>
        <RouterLink class = "routeItem"  to="/Questionnaire">發問卷</RouterLink>
        <RouterLink class = "routeItem"  to="/QuestionWrite">填問卷</RouterLink>
    </div>    
</template>

<style scoped lang = "scss">


*{
    font-family: "Zen Kaku Gothic New", sans-serif;
}
.headerArea{
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    background: black;
    opacity: 0.8;


    .routeItem{
        position: relative;
        width: 10%;
        margin: 0 2%;
        font-size: 20px;
        color: white;
        text-decoration: none;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;
        &:hover{
            color: #55dde0;
            &:before{
                content: "";
                position: absolute;
                left: 0;
                bottom: -12px;
                width: 100%;
                height: 5px;
                background-color: #55dde0;

            }
        }
    }
} 
</style>
