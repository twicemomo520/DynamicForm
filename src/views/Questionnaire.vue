<script>
import QuestionTitle from "../components/QuestionTitle.vue"
import QuestionContent from "../components/QuestionContent.vue"
import QuestionCheck from "../components/QuestionCheck.vue"
export default{
    components:{
        QuestionTitle,
        QuestionContent,
        QuestionCheck
    },
    data(){
        return{
            currentView:"QuestionTitle"
        }
    },
    methods:{
        changeView(newView){
            this.currentView = newView;
            console.log(this.currentView)
        }
    }
}
</script>

<template>

    <!-- <div class="blankBlock">

    </div> -->

    <div class="h1Class">
        <h1 v-on:click = "currentView ='QuestionTitle'">問卷題目</h1>
        <h1 v-on:click = "currentView ='QuestionContent'">問卷內容</h1>
        <h1 v-on:click = "currentView ='QuestionCheck'">問卷確認</h1>
        <h1 v-on:click = "currentView ='QuestionCheck'">統計</h1>
    </div>


    <QuestionTitle class="content"  v-if="currentView==='QuestionTitle'"
    @changeView="changeView">
    </QuestionTitle>


    <QuestionContent class="content" v-if="currentView==='QuestionContent'"
    @changeView="changeView">
    </QuestionContent>
    
    <QuestionCheck  class="content" v-if="currentView==='QuestionCheck'"
    @changeView="changeView">
    </QuestionCheck>
  

</template>

<style scoped lang="scss">

$blackcolor1: #f7f7f7;
$blackcolor2: #ebebeb;
$blackcolor3: #d9d9d9;
$blackcolor4: #bdbdbd;
$blackcolor5: #999;
$blackcolor6: #737373;
$blackcolor7: #4d4d4d;
$blackcolor8: #333;
$blackcolor9: #1a1a1a;
$blackcolor10:#00000014;

$pinkcolor1:#ffe3e3;
$pinkcolor2:#ffbdbd;
$pinkcolor3:#ff9b9b;
$pinkcolor4:#f86a6a;
$pinkcolor5:#ef4e4e;
$pinkcolor6:#e12d39;
$pinkcolor7:#cf1124;
$pinkcolor8:#ab091e;
$pinkcolor9:#8a041a;
$pinkcolor10:rgb(255, 200, 212);
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Zen Kaku Gothic New", sans-serif;
    
}
.content{
    background-color: $pinkcolor1;
}
.h1Class{
    width: 100dvw;
    height: 10dvh;
    display: flex;
    padding-top: 15px;
    align-content: center;
    justify-content: flex-start;
    margin-left: 40%;
    margin-top: 2%;
    h1{
        background: $blackcolor10;
        color: black;
        width: 120px;
        font-weight: 500;
        font-size: 20px;
        padding-right: 15px;
        padding-left: 15px;
        padding-top: 15px;
        cursor: pointer;
        box-shadow: 0 8px 32px 0 rgba(244, 218, 218, 0.2);
        backdrop-filter: blur( 10px );
        -webkit-backdrop-filter: blur( 4px );
        border-radius: 10px;
        border-top-right-radius: 30px;
        

        &:hover{
            background-color: rgb(215, 231, 124);
            color: #023e8a;
        }

        &:active{
            background-color: black;
        }
    }

}






</style>
