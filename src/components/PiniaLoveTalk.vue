<script>
import axios from "axios"
import { nanoid } from "nanoid";
import {useTalkStore} from "@/stores/loveTalk"

export default{
    data(){
        return{
            talkList2:useTalkStore(),
            talkList:[
                {id:"1", title:"今天你有點怪，怪好看的"},
                {id:"2", title:"草莓藍莓蔓越莓，你今天想我了沒"},
                {id:"3", title:"我給你留了塊地我的死心踏地"},
            ],
        }
    },
    methods:{
        getLoveTalk(){
            let obj = {id:nanoid(), title:nanoid()}
            this.talkList.unshift(obj)
        }
    }
}
</script>

<template>
    <div class="talk">
        <button @click="getLoveTalk">獲取一句土味情話</button>
        <ul>
            <li v-for="item in talkList" :key="item.id">{{ item.title }}</li>
        </ul>
    </div>

    <div class="talk">
        <button @click="getLoveTalk">獲取一句土味情話</button>
        <ul>
            <li v-for="item in talkList2.talkList" :key="item.id">{{ item.title }}</li>
        </ul>
    </div>
    
</template>


<style scoped lang="scss">
      .talk{
        width: 80dvw;
        height: 20dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        background-color: pink;
        border-radius: 10px;
        box-shadow: 0 0 10px;
        button{
            margin: 20px ;
        }

    }
</style>