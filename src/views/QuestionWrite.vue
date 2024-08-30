<script>
    import QuestionInput from "../components/QuestionInput.vue"
    export default{
        data(){
            return{
                databaseItem:null,
            }
        },
        components:{
            QuestionInput
        },

        created()
        {
            const formId = this.$route.query.formId;
            this.databaseItem = JSON.parse(formId)
        }
    }
</script>

<template>
    <div class="container">
        <QuestionInput class="content" :databaseItem="databaseItem">
        </QuestionInput>
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

}

</style>