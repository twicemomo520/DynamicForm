<script>
import {useCounterStore} from "@/stores/counter"
export default{
    data(){
        return{
            counterStore:useCounterStore(),
            sum:0,
            n:0,
        }
    },
    methods:{
        add(){
            // this.sum = this.sum + this.n
            //第一種修改方式
            this.counterStore.sum = this.counterStore.sum + this.n
            //第二種修改方式 批量修改
        },
        minus(){
            this.sum = this.sum-this.n
        },
    }
}
</script>

<template>
        <h1>歡迎來到{{this.counterStore.school}}</h1>
        <h1>坐落於{{this.counterStore.address}}</h1>
    <div class="count">
        <h1>當前求和為{{this.counterStore.sum}}</h1>

        <div class="optionAndButton">
            <select v-model.number="n">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <button @click=add>加</button>
            <button @click=minus>減</button>
        </div>
    </div>
</template>


<style scoped lang="scss">
    .count{
        width: 80dvw;
        height: 20dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        background-color: skyblue;
        border-radius: 10px;
        box-shadow: 0 0 10px;
        h1{
            position: relative;
            margin: 10px;
            &:before{
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                height: 5px;
                width: 100%;
                background-color: blue;
        }
        }

        .optionAndButton{
            select, button{
                margin: 0 20px;
                height:25px;
                width:40px
            }
        }
    }
</style>