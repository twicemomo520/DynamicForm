<script>
import {useEditStore} from "@/stores/databaseEdit"
import {useNgrokStore} from "@/stores/ngrok"
import axios from 'axios';

export default{
    data(){
        return{
            quiz:null,
            quesList:[],
            quizAndQuesList:null,
            databaseEdit:useEditStore().databaseEdit,
        }
    },
    methods:{
        previousPage(){
            this.$emit("changeView", 'QuestionContent')
        },
        publish(){
            if (useEditStore().databaseEdit == false){ 
                this.submitData()
            }
            else{
                this.submitEditData()
            }
        },

        submitEditData(){
            // axios.post('http://localhost:3000/edit-data', this.quiz)
            axios.post(`${useNgrokStore().ngrokPath}/quiz/update`, this.quizAndQuesList)
            .then(response => {
                alert('Data saved successfully!');
                })
            .then(()=>{
                this.clearTableSession()  
                useEditStore().databaseEdit = false
            })    
            .then(()=>{
                this.$router.push('/ManageSurvey');
            })
            .catch(error => {
                console.error('Failed to save data:', error);
                });
            
        },

        submitData(){
            // axios.post('http://localhost:3000/save-data', this.quiz)
            axios.post(`${useNgrokStore().ngrokPath}/quiz/create`, this.quizAndQuesList)
            .then(response => {
                alert('Data saved successfully!');
                })
            .then(()=>{
                this.$router.push('/ManageSurvey');   
            })    
            .catch(error => {
                console.error('Failed to save data:', error);
                }); 
            
        },

        clearTableSession() {
            // 清空 sessionStorage
            // sessionStorage.removeItem('tableData');
            // sessionStorage.removeItem('inputDataTitle');
            // sessionStorage.removeItem('inputDataContent');
            // sessionStorage.removeItem('inputTitleContent');

        },

        formOption(formOption){
            formOption
        }

    },
    created(){

        let quiz = sessionStorage.getItem('quiz')
        if (quiz){
            this.quiz = JSON.parse(quiz)
            this.quizAndQuesList = JSON.parse(quiz)
        }

        let quesList = sessionStorage.getItem('quesList')
        if (quesList){
            this.quesList = JSON.parse(quesList)  
            this.quizAndQuesList.quesList = JSON.parse(quesList)
        }

        this.quizAndQuesList.quesList.forEach(item=>{
            if (Array.isArray(item.options)) {
                item.options = item.options.join(';');
            }

        })    

    },

}
</script>

<template>
    
    <div class="maxArea">
        <!-- <h1>是否編輯中{{ databaseEdit }}</h1>\n -->
        <!-- <h1>quiz: {{ quiz }}</h1>\n -->
        <!-- <h1>quesList: {{ quesList[0] }}</h1>\n -->
        <!-- <h1>quizAndQuesList: {{ quizAndQuesList }}</h1> -->

        <h1>{{quiz.name}}</h1>
        <div class="formDescribe">{{quiz.description}}</div>
        <div class="personalData">
            <div class = "personalDetail">
                <p>姓名:</p>
                <input type="text">
            </div>
            <div class = "personalDetail">
                <p>手機:</p>
                <input type="tel">
            </div>
            <div class = "personalDetail">
                <p>E-mail:</p>
                <input type="email">
            </div>
            <div class = "personalDetail">
                <p>年齡:</p>
                <input type="number">
            </div>
        </div>
        <div class="formTable" v-for="item in quesList">
            <div class="formQuestion">
                <p>{{ item.qu }}</p>
                <p>{{ item.necessary ? "*" : ""}}</p>
                <p>({{ item.type }})</p>
            </div>

            <div class="formSingle" v-if="item.type=='單選'" v-for="option in item.options">
                <input type="radio" :id="option" name="option" :value="option">
                <label :for="option">{{ option }}</label>
            </div>

            <div class="formMulti" v-if="item.type=='多選'" v-for="option in item.options">
                <input type="checkbox" :id="option" name="option" :value="option">
                <label :for="option">{{ option }}</label>
            </div>

            <div class="formSelect" v-if="item.type=='選單'">
                <select name="" id="">
                    <option v-for="option in item.options" :key="option" :value="option">{{option}}</option>
                </select>
            </div>

            <div class="formInput" v-if="item.type=='詳述'">
                <textarea type="text">
                </textarea>
            </div>

        </div>

        <div class="submitButton">
            <button v-on:click="previousPage">上一頁</button>
            <button v-on:click="publish">{{ databaseEdit ? "確認修改" : "確認發佈" }}</button>
        </div>
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
    height: auto;
    padding: 4% 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;
    box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);

    .formDescribe{
        margin-top: 20px;
    }

    .personalData{
        width: 100%;

        .personalDetail{
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: -40px;
            &:last-child{
                margin-bottom: 0;
            }
            p{
                width: 50px; 
                height:20px;
                font-weight: 400;
            }
            input{
                width: 300px;
                height:30px;
                margin-left: 2%;
                flex-wrap: wrap;
                background-color:#f8d5d5;
                color:#737373;
                border-left: none; /* 去除左边框 */
                border-right: none; /* 去除右边框 */
                border-top: none; /* 去除上边框 */
                border-bottom: 1px solid rgb(207, 111, 131);
                outline: none;
                
                &:focus {
                    outline: none; /* 移除默認的focus邊框 */
      
                }

            }

            
        }
    }

    .formTable{
        width: 100%;
        margin-bottom: 40px;
        p{
            font-size: 25px;
        }
        input{
            font-size: 20px;
        }
        .formQuestion{
            display: flex;
            align-items: center;
            justify-content: start;
            margin-bottom: 5px;
            
            p{
                &:nth-child(2){
                    color: red;
                }
                &:last-child{
                    margin-left: 10px; //為p標籤增加左邊間距
                }
                
            }
        }
        input, select{
            border-radius: 6px;
            border: 1px solid #F7F7F5;
            font-size: 17px;
        }

        textarea{
            width: 500px;
            height:200px;
            flex-wrap: wrap;
            background-color:#ffe3e3;
            color:#737373;
            border: 1px solid rgb(207, 111, 131);
            outline: none;
            resize:none;
        }
        
    }

    .submitButton{
        display: flex;
        align-items: center;
        justify-content: start;

        button{
        width: 100px;
        height: 50px;
        margin: 20px;
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
}
</style>