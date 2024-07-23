<script>
export default{
    data(){
        return{
            firstPage:{
                formName:'',
                formDescribe:'',
                startDate:'2024-07-05',
                endDate:''   
            },
        }
    },
    methods:{
        nextPage(){
            this.$emit('changeView', 'QuestionContent')
        },
        inputBox(text){
            let len = text.length
            let height = parseInt(len / 32)
            let width = len % 32
            return [width, height]
        },
        updateTime(){
            let now = new Date()
            let year = now.getFullYear();       
            let month = String(now.getMonth()+1);       
            let day = String(now.getDate());      
            // return [String(year)+'-'+String(month)+'-'+String(day)] 
            this.currentDate = String(year)+'-'+String(month)+'-'+String(day)
        }
    },
    created(){
        this.updateTime();
    }
    
}
</script>

<template>
    <div class="maxArea">
        <div class="inputArea">
            <p>問卷名稱: </p>
            <input type="text" class="inputResize" v-model="firstPage.formName" v-bind:style="{width: inputBox(firstPage.formName)[0]+'px', height:inputBox(firstPage.formName)[1]}+'px'"  placeholder="問卷名稱">
            <h1>{{ this.currentDate }}</h1>
        </div>  
        
        <div class="inputArea">
            <p>問卷說明: </p>
            <input type="text" class="inputResize" v-model="firstPage.formDescribe" placeholder="問卷說明">
        </div>

        <div class="inputArea">
            <p>開始時間: </p>
            <input type="date" class="inputFixed" v-model="firstPage.startDate">
        </div>
        
        <div class="inputArea">
            <p>結束時間: </p>
            <input type="date" class="inputFixed" v-model="firstPage.endDate">
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
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    // backdrop-filter: blur(5px);
    // box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    // border: 1px solid rgba(255,255,255,0.5);
    // border-right: 1px solid rgba(255,255,255,0.2);
    // border-bottom: 1px solid rgba(255,255,255,0.2);


    .inputArea{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: left;
        p{
            padding: 20px;
            font-weight: 400;
        }

        input{
            width: 150px;
            height:30px;
            flex-wrap: wrap;
            background-color:#ffe3e3;
            color:#737373;
            border: 1px solid rgb(207, 111, 131);
            &:focus {
                outline: none; /* 移除默認的focus邊框 */
                border: 1px solid rgb(207, 111, 131);
            }
            &:nth-child(0){
                width: 500px;

            }
        }
        .inputResize{
            width: 500px;
            height: 100px;
            margin-top: 1%;
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