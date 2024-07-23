<script>
export default{
    data(){
        return{
            secondPage:{
                formQuestion:'',
                formSingleOrMulti:'',
                formMustCheckbox:false,
                formOption:'',
            },
        }
    },
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

        <div class="inputArea1">
            <p>問題: </p>
            <input type="text"  v-model="secondPage.formQuestion" placeholder="請輸入問題">
            <h1>{{ secondPage.formQuestion }}</h1>

            <select v-model="secondPage.formSingleOrMulti">
                <option value="single" >單選題</option>
                <option value="multi" >多選題</option>
            </select>
            <h1>{{ secondPage.formSingleOrMulti }}</h1>
            
            <input type="checkbox" id = "mustCheck" v-model="secondPage.formMustCheckbox">
            <label for="mustCheck">必填</label>
            <h1>{{ secondPage.formMustCheckbox }}</h1>

        </div>  

        <div class="inputArea2" >
            <p>選項: </p>
            <div class="littleArea">
                <p>(多個答案請以; 分隔)</p>
                <input type="text" class="inputResize" v-model="secondPage.formOption" placeholder="核廢料(高雄中學); 金貝貝(高雄女中); 貂蟬(北一女)">
                <h1>{{ secondPage.formOption }}</h1>
                <button type="button" class="addButton">加入</button>
            </div>
        </div>

        <div class="inputArea3">
            <i class="fa-solid fa-trash"></i>
            <table>
                <thead>
                    <tr>
                        <th>勾選</th>
                        <th>編號</th>
                        <th>內容</th>
                        <th>問題種類</th>
                        <th>必填</th>
                        <th>編輯</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <th><input type="checkbox"></th>
                        <th>#1</th>
                        <th>請選取最喜歡的人</th>
                        <th>單選題</th>
                        <th><input type="checkbox"></th>
                        <th>編輯</th>
                    </tr>
                    <tr>
                        <th><input type="checkbox"></th>
                        <th>#2</th>
                        <th>請說明理由</th>
                        <th>短述題</th>
                        <th><input type="checkbox"></th>
                        <th>編輯</th>
                    </tr>
                    <tr>
                        <th><input type="checkbox"></th>
                        <th>#3</th>
                        <th>請選取在活動開始前有聽過</th>
                        <th>單選題</th>
                        <th><input type="checkbox"></th>
                        <th>編輯</th>
                    </tr>
                </tbody>
            </table>
            
        </div>


        <button v-on:click="previousPage">上一頁</button>
        <button v-on:click="nextPage">送出</button>
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

    .inputArea1{
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

    .inputArea2{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: left;
        .littleArea{
            display: flex;
            flex-direction: column;
            align-items:flex-start;
            justify-content: center;
            padding-top: 50px;
            p{
                padding: 0;    
            }
        }

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


    .inputArea3{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: left;

        .fa-trash{
            font-size: 30px;
        }
        table{
            width: 100%;
            border-collapse: collapse; /* 确保边框合并 */
            border-spacing: 0; /* 确保中间没有空隙 */

            th, td{
                border: 1px solid black;
                padding: 8px;
                text-align: left;

        }
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