<script>
    import QuestionStatisticsSingle from '@/components/QuestionStatisticsSingle.vue';
    import QuestionStatisticsAll from '@/components/QuestionStatisticsAll.vue';
    import{useStatisticsStore} from '@/stores/statistics'

    export default{
        data(){
            return{
                currentView:"QuestionStatisticsAll"
            }
        },
        components:{
            QuestionStatisticsSingle,
            QuestionStatisticsAll
        }
    }
</script>

<template>
    <div class="container">
        <div class="h1Class">
            <h1  v-on:click = "currentView ='QuestionStatisticsSingle'" :class="{'clickStyle': currentView=='QuestionStatisticsSingle'}">問題回饋</h1>
            <h1 v-on:click = "currentView ='QuestionStatisticsAll'" :class="{'clickStyle': currentView=='QuestionStatisticsAll'}">統計</h1>
        </div>

        <QuestionStatisticsSingle class="content" v-if="currentView=='QuestionStatisticsSingle'" :class="{'clickStyle': currentView=='QuestionStatisticsSingle'}">

        </QuestionStatisticsSingle>

        <QuestionStatisticsAll class="content" v-if="currentView=='QuestionStatisticsAll'" :class="{'clickStyle': currentView=='QuestionStatisticsAll'}">

        </QuestionStatisticsAll>
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
    padding: 2% 2%;

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

    .content{
        background-color: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(20px);
        background-image: linear-gradient(180deg, rgba(255,255,255,0.8));
        border-radius:20px;    
    }
}


</style>