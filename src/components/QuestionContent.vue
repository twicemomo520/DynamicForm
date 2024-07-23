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

        <div class="inputArea">
            <p>問題: </p>
            <input type="text" value="請選取最喜歡的人">
            <select>
                <option value="single">單選題</option>
                <option value="multi">多選題</option>
            </select>
            <input type="checkbox" id = "mustCheck">
            <label for="mustCheck">必填</label>
        </div>  


        <button v-on:click="previousPage">上一頁</button>
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
        select{
            margin-left: 20px;
        }

        #mustCheck{
            width: 15px;;
            margin-left: 20px;
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