<script>
import {useEditStore} from "@/stores/databaseEdit"

export default{
    data(){
        return{
            quiz:{
                name:'',
                description:'',
                startDate:'',
                endDate:'',
                published:false   
            },
            databaseEdit:useEditStore().databaseEdit
        }
    },
    props:["databaseItem", "testItem"],
    
    // computed: {
    //     formattedItem() {
    //         return JSON.parse(JSON.stringify(this.databaseItem));
    //     }
    // },

    methods:{
        nextPage(){
            this.saveToSessionStorage()

            this.$emit('changeView', 'QuestionContent')
        },
        inputBox(text){
            let len = text.length
            let height = parseInt(len / 32)
            let width = len % 32
            return [width, height]
        },
        updateStartTime(){
            let now = new Date()
            now.setDate(now.getDate() + 2); 

            let year = now.getFullYear();       
            let month = String(now.getMonth() + 1).padStart(2, '0');   
            let day = String(now.getDate()).padStart(2, '0');
            this.quiz.startDate = `${year}-${month}-${day}`;
        },
        updateEndTime(){
            let now = new Date()
            now.setDate(now.getDate() + 7); 

            let year = now.getFullYear();       
            let month = String(now.getMonth() + 1).padStart(2, '0');   
            let day = String(now.getDate()).padStart(2, '0');
            this.quiz.endDate = `${year}-${month}-${day}`;
        },
        saveToSessionStorage(){
            sessionStorage.setItem('quiz', JSON.stringify(this.quiz))

        },

    },
    created(){
        this.updateStartTime();
        this.updateEndTime();

        if (this.databaseItem && useEditStore().databaseEdit){
            this.quiz = this.databaseItem
            console.log("執行"+this.databaseItem && useEditStore().databaseEdit)
        }
    
        if(sessionStorage.getItem('quiz')){
            this.quiz = JSON.parse(sessionStorage.getItem('quiz'))  
            console.log("執行"+sessionStorage.getItem('quiz'))
        } 

    },


    
}
</script>

<template>
    <div class="maxArea">
        <!-- <h1>哈囉{{ testItem }}</h1> -->
        <!-- <h1>{{ databaseItem}}</h1> -->
        <!-- <h1>是否編輯中{{ databaseEdit }}</h1> -->
        <!-- <h1>databaseItem:{{ databaseItem }}</h1> -->
        <div class="inputArea">
            <p>問卷名稱: </p>
            <textarea type="text" class="inputTextArea"  v-model="quiz.name" @input="saveToSessionStorage"  placeholder="問卷名稱">
            </textarea>
        </div>  
        
        <div class="inputArea">
            <p>問卷說明: </p>
            <textarea type="text" class="inputTextArea" v-model="quiz.description" @input="saveToSessionStorage" placeholder="問卷說明">
            </textarea> 
        </div>

        <div class="inputArea">
            <p>開始時間: </p>
            <input type="date"  class="inputTextArea inputTextArea-center" v-model="quiz.startDate" @input="saveToSessionStorage">
        </div>
        
        <div class="inputArea">
            <p>結束時間: </p>
            <input type="date"  class="inputTextArea inputTextArea-center" v-model="quiz.endDate" @input="saveToSessionStorage">
        </div>

        <button v-on:click="nextPage">下一頁</button>
    </div>

</template>


<style scoped lang="scss">
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Zen Kaku Gothic New", sans-serif;
}

.maxArea{    

    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 12px;
    box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);
    padding: 4% 2%;
    margin-bottom: 2%;

    .inputArea{
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: left;
        p{
            font-weight: 700;
            font-size: 20px;
        }

        .inputTextArea{
            position: relative;
            width: 400px;
            height:50px;
            margin-left: 20px;  
            flex-wrap: wrap;
            background-color:#f2f2f2;
            color:#4c4b4b;
            border: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.497);
            padding: 10px;
            resize: none; 
            font-size: 15px;
            box-shadow: 2px 1px 2px rgba(0,0,0,0.2), -1px 0px 8px rgba(0,0,0,0.2);
            &:focus{
                outline: none;
            }
        }

        .inputTextArea::before{
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0.175rem;
                background: #007bff; // 藍色邊框顏色
                
            }

        .inputTextArea-center::before{
            transform: scale(0,1);
            transition: transform 0.3s ease;
        }
        .inputTextArea-center:hover::before{
            transform: scale(1,1);
        }

    }
    button{
        width: 100px;
        height: 50px;
        cursor: pointer;
        border-radius: 15px;
        border:none;
        color:white;
        font-size: 20px;
        background: #5fa8d3;  /* fallback for old browsers */
        &:hover{
            background-color: rgb(215, 231, 124);
            color: #023e8a;
        }


    }
}


</style>