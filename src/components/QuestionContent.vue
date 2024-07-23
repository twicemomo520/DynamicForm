<script>
export default{
    methods:{
        nextPage(){
            this.$emit("changeView", 'QuestionCheck')
        },
        previousPage(){
            this.$emit("changeView", 'QuestionTitle')
        },
    }
}
</script>

<template>
    <div class="maxArea">

        <div class="inputOuter">
            <h1>問題: </h1>
            <div class="input">
                <input type="text" value="請選取最喜歡的人">
                <select>
                    <option value="single">單選題</option>
                    <option value="multi">多選題</option>
                </select>
                <input type="checkbox" id = "mustCheck">
                <label for="mustCheck">必填</label>
            </div>  
        </div>
        <div class="input">
            <h1>問卷說明: </h1>
            <input type="text" value="不要問你會怕"
        </div>

        <div class="input">
            <h1>開始時間: </h1>
            <input type="date" value="2024-07-20">
        </div>
        
        <div class="input">
            <h1>結束時間: </h1>
            <input type="date" value="2024-07-20">
        </div>
        <button v-on:click="previousPage">上一頁</button>
        <button v-on:click="nextPage">下一頁</button>
    </div>
</template>


<style scoped lang="scss">

.maxArea{
    
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    // backdrop-filter: blur(5px);
    // box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    // border: 1px solid rgba(255,255,255,0.5);
    // border-right: 1px solid rgba(255,255,255,0.2);
    // border-bottom: 1px solid rgba(255,255,255,0.2);
    

    .input{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: left;
        h1{
            padding: 20px;
            font-weight: 400;
        }

        input{
            width: max-content;
            height: max-content;
            flex-wrap: wrap;

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