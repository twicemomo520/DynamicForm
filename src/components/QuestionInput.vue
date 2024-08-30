<script>
import {useEditStore} from "@/stores/databaseEdit"
import axios from 'axios';

export default{
    data(){
        return{
            quiz:null,
            feedbackList:[],
            userInfo:{            
                name:"",
                phone:"",
                email:"",
                age:0
            },
            feedback:{},
            ansList:[],
            quesList:[],
            feedbackFinal:{},
            quizAndQuesList:null,
            databaseEdit:useEditStore().databaseEdit,
        }
    },
    props:["databaseItem"],
    
    methods:{
        publish(){
            if (useEditStore().databaseEdit == false){ 
                this.submitData()
            }
        },

        submitData(){
            this.combine()
            axios.post('http://localhost:8080/quiz/fillin', this.feedbackFinal)
            .then(response => {
                alert('Data saved successfully!');
                })
            .then(()=>{
                this.$router.push('/FillSurvey');   
            })    
            .catch(error => {
                console.error('Failed to save data:', error);
                }); 
            },
        
        combine(){
            this.feedbackList.forEach((item, index)=>{
                item.ans = this.ansList[index]
                if (Array.isArray(item.ans)){
                    item.ans = item.ans.join(';')
                }

                item.name = this.userInfo.name
                item.phone = this.userInfo.phone
                item.email = this.userInfo.email
                item.age = this.userInfo.age
                const now = new Date();
                item.fillinDateTime = new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString();
            })

            this.feedbackFinal.feedbackList = this.feedbackList
        }    

    },
    created(){
        this.quiz = this.databaseItem
        let length = this.quiz.quesList.length


        this.quiz.quesList.forEach((ques, index) => {
            this.ansList.push([])
            this.feedbackList.push([])

            let feedback = {}
            feedback.quizId = ques.quizId
            feedback.quId = ques.id
            feedback.name = this.userInfo.name
            feedback.phone = this.userInfo.phone
            feedback.email = this.userInfo.email
            feedback.age = this.userInfo.age

            this.feedbackList[index] = feedback


        });
        

        // this.feedbackList.push(quizId)

        // console.log("執行" + quizId)

    },

}
</script>

<template>
    
    <div class="maxArea">
        <!-- <h1>quiz: {{ quiz }}</h1>\n -->
        <!-- <h1>ansList{{ ansList }}</h1>\n -->
        <!-- <h1>feedbackList{{ feedbackList }}</h1> -->
        <!-- <h1>feedbackFinal{{ feedbackFinal }}</h1> -->
        <!-- <button @click="combine">test</button> -->
        <h1>{{quiz.name}}</h1>
        <div class="formDescribe">{{quiz.description}}</div>
        <div class="personalData">
            <div class = "personalDetail">
                <p>姓名:</p>
                <input type="text" v-model="userInfo.name">
            </div>
            <div class = "personalDetail">
                <p>手機:</p>
                <input type="tel" v-model="userInfo.phone">
            </div>
            <div class = "personalDetail" >
                <p>E-mail:</p>
                <input type="email" v-model="userInfo.email">
            </div>
            <div class = "personalDetail">
                <p>年齡:</p>
                <input type="number" v-model="userInfo.age">
            </div>
        </div>
        <div class="formTable" v-for="(item,index) in quiz.quesList">
            <div class="formQuestion">
                <p>{{ item.qu }}</p>
                <p>{{ item.necessary ? "*" : ""}}</p>
                <p>({{ item.type }})</p>
            </div>

            <div class="formSingle" v-if="item.type=='單選'" v-for="(option, optIndex) in item.options">
                <input type="radio" :id="`option-${index}-${optIndex}`" name="`option-${index}`" :value="option" v-model="ansList[index]">
                <label :for="`option-${index}-${optIndex}`">{{ option }}</label>
            </div>

            <div class="formMulti" v-if="item.type=='多選'" v-for="(option, optIndex) in item.options">
                <input type="checkbox" :id="`option-${index}-${optIndex}`" name="`option-${index}`" :value="option" v-model="ansList[index]">
                <label :for="`option-${index}-${optIndex}`">{{ option }}</label>
            </div>

            <div class="formSelect" v-if="item.type=='選單'">
                <select name="" id="" v-model="ansList[index]">
                    <option v-for="option in item.options" :key="option" :value="option" >{{option}}</option>
                </select>
            </div>

            <div class="formInput" v-if="item.type=='詳述'">
                <textarea type="text" v-model="ansList[index]">
                </textarea>
            </div>

        </div>

        <div class="submitButton">
            <router-link to="/FillSurvey" class="button-link">上一頁</router-link>
            <!-- <router-link to="/FillSurvey" class="button-link" @click = "submitData">送出</router-link> -->

            <!-- <button v-on:click="previousPage">上一頁</button> -->
            <button @click="submitData">送出</button>
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
    margin-top: 5%;
    padding: 4% 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 6px;
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
        .button-link{
            display: flex; /* 使用 flexbox */
            align-items: center; /* 垂直居中 */
            justify-content: center; /* 水平居中 */
            width: 100px;
            height: 50px;
            margin: 20px;
            cursor: pointer;
            border-radius: 15px;
            border:none;
            color:white;
            font-size: 20px;
            background: #5fa8d3;  /* fallback for old browsers */
            text-decoration: none; /* 移除默认的下划线 */
            &:hover{
                background-color: rgb(215, 231, 124);
                color: #023e8a;
            }
        }
    }
}
</style>