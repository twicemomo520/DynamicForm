<script>
import QuestionTitle from "../components/QuestionTitle.vue"
import QuestionContent from "../components/QuestionContent.vue"
import QuestionCheck from "../components/QuestionCheck.vue"
import QuestionHome from "../components/QuestionHome.vue"

export default{
    components:{
        QuestionHome,
        QuestionTitle,
        QuestionContent,
        QuestionCheck
    },
    data(){
        return{
            currentView:"QuestionTitle",
            titleData: null,
            allData:null,
            databaseItem:null,
            testItem: "哈哈測試",
        }
    },
    methods:{
        changeView(newView){
            this.currentView = newView;
            console.log(this.currentView)
        }
    },
    created(){
        let savedData = sessionStorage.getItem('inputData')
        if (savedData){
            this.allData = JSON.parse(savedData)
        }

        const formId = this.$route.query.formId;
        this.databaseItem = formId ? JSON.parse(formId) : null;

        
    }
}
</script>

<template>
    <div class="container">
        <div class="h1Class">
            <h1 v-on:click = "currentView ='QuestionTitle'" :class="{'clickStyle': currentView=='QuestionTitle'}">問卷題目</h1>
            <h1 v-on:click = "currentView ='QuestionContent'" :class="{'clickStyle': currentView=='QuestionContent'}">問卷內容</h1>
            <h1 v-on:click = "currentView ='QuestionCheck'" :class="{'clickStyle': currentView=='QuestionCheck'}">問卷確認</h1>
            <h1 v-on:click = "currentView ='QuestionCheck'" >統計</h1>
        </div>

        <QuestionTitle class="content"  v-if="currentView==='QuestionTitle'" 
        @changeView="changeView" :databaseItem="databaseItem" >
        </QuestionTitle>


        <QuestionContent class="content" v-if="currentView==='QuestionContent'" :class="{'clickStyle': currentView=='QuestionTitle'}"
        @changeView="changeView" :databaseItem="databaseItem" >
        </QuestionContent>
        
        <QuestionCheck  class="content" v-if="currentView==='QuestionCheck'" :class="{'clickStyle': currentView=='QuestionTitle'}"
        @changeView="changeView" :databaseItem="databaseItem">
        </QuestionCheck>
    </div>

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
.container{
    width: 100%;
    height: 100%;
    overflow: auto; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    // --colors: #f94144, #f3722c, #f8961e, #f9844a, #f9c74f, #90be6d, #43aa8b, #4d908e, #577590, #277da1;
    // --min-radius: 20;
    // --max-radius: 100;
    // --num-circles: 30;
    // --min-opacity: 10;
    // --max-opacity: 50;
    // --seed: 42;
    // background-image: paint(circles);

    .content{
        background-color: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(20px);
        background-image: linear-gradient(
            180deg,
            rgba(255,255,255,0.8),
            );
        border-radius:20px;    
        }

    .h1Class{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 15px;
        margin: 2% 0;
        
        .clickStyle{
            background-color: $blackcolor7;
            color: white;
            transform: translateY(-10px); 
            transition: transform 0.3s ease; 
        } 

        h1{ 
            display: flex;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
            background: $blackcolor10;
            color: black;
            width: 120px;
            height: 50px;
            font-weight: 500;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 8px 32px 0 rgba(244, 218, 218, 0.2);
            backdrop-filter: blur( 10px );
            -webkit-backdrop-filter: blur( 4px );
            border-radius: 10px;
            
            &:hover{
                background-color: $blackcolor7;
                color: white;
            }

            &:active{
                background-color: black;
            }
        }

    }

}






</style>
