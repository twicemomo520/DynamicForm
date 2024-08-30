<script>
import {useEditStore} from "@/stores/databaseEdit"

export default{
    
    components:{

    },
    data(){
        return{
            quiz:{
                name:'',
                description:'',
                startDate:'',
                endDate:'',
                published:false   
            },
            ques:{
                quizId:'',
                id: '',
                qu:'',
                type:'單選',
                necessary:false,
                options:[],
            },
            optionTemp:"",

            quesList:[],
            selectedRows:[],

            databaseEdit:useEditStore().databaseEdit,
            isEditing:false,
            currentDeleteId:null,
        }
    },

    props:["databaseItem", "testItem"],

    computed:{
        
    },
    methods:{
        previousPage(){
            this.saveToSessionStorage()
            this.$emit("changeView", 'QuestionTitle')
        },
        nextPage(){
            this.saveToSessionStorage()
            this.$emit("changeView", 'QuestionCheck')

        },
        initialQuesState(){  
            this.ques = {
                quizId: '',
                id: '',
                qu: '',
                type: '單選',
                necessary: false,
                options: [],
            };
            this.optionTemp = ''
        },


        pushToOption(){
            this.ques.options.push(this.optionTemp)
            this.optionTemp = ""
        },
        deleteOption(index){
            if (Array.isArray(this.ques.options)) {
                this.ques.options.splice(index, 1);
            } else {
                console.error("options 不是list:", this.ques.options);
            }
        },
        pushToTable(){
            if (!this.isEditing){
                let length = this.quesList.length
                this.ques['quizId'] = this.quiz.id
                this.ques['id'] = length+1
                let deepCopy = JSON.parse(JSON.stringify(this.ques));
                this.quesList.push(deepCopy)
                sessionStorage.setItem('quesList', JSON.stringify(this.quesList))
                sessionStorage.removeItem('ques')

                this.initialQuesState()
                }     
            else{
                this.ques['quizId'] = this.quiz.id
                let index = this.quesList.findIndex(item => item.id == this.ques.id)
                if (index !== -1){
                    this.quesList.splice(index, 1, JSON.parse(JSON.stringify(this.ques)))
                }
                this.isEditing = false;
                sessionStorage.setItem('quesList', JSON.stringify(this.quesList))
                sessionStorage.removeItem('ques')

                this.initialQuesState()

            }              
        },
        deleteSelected(){
            // 删除選中的行
            this.quesList = this.quesList.filter((item, index) => !this.selectedRows.includes(index));
            // 清空已選中的項目
            this.selectedRows = [];  
            
            this.quesList.forEach(function(item, index){
                item.id = index+1
            })
        },
        editSelected(item,index){
            this.ques = {
                id: item.id,
                qu: item.qu,
                type: item.type,
                necessary: item.necessary,
                options: item.options,
            },
            this.isEditing = true
        },
        saveToSessionStorage(){
            sessionStorage.setItem('ques', JSON.stringify(this.ques))
            sessionStorage.setItem('quesList', JSON.stringify(this.quesList))
        },
    },

    created(){
        if (this.databaseItem && useEditStore().databaseEdit){
            this.quesList = this.databaseItem.quesList
        }

        let quiz = sessionStorage.getItem('quiz')
        if (quiz){
            this.quiz = JSON.parse(quiz)  
        }
        
        let ques = sessionStorage.getItem('ques')
        if (ques){
            this.ques = JSON.parse(ques)  
        }

        let quesList = sessionStorage.getItem('quesList')
        if (quesList){
            this.quesList = JSON.parse(quesList)  
        }


        // let inputDataTitle = sessionStorage.getItem('inputDataTitle')
        // if (inputDataTitle){
        //     this.firstPage.firstPage = JSON.parse(inputDataTitle)  
        // }

        // let savedContent = sessionStorage.getItem('inputDataContent')
        // if (savedContent){
        //     this.secondPage = JSON.parse(savedContent)
        // }

        // let tableData = sessionStorage.getItem("tableData")
        // if (tableData){
        //     this.tableData = JSON.parse(tableData)
        // }
        
    }
}
</script>

<template>
    <div class="maxArea">
        <!-- test -->
        <!-- <h1>{{ databaseItem.firstPage.tableData }}</h1> -->
        <!-- <h1>table資料{{ databaseItem }}</h1> -->
        <!-- <h1>第一個page{{ this.firstPage.firstPage }}</h1> -->
        <!-- <h1>是否編輯中{{ databaseEdit }}</h1> -->
        <!-- <h1>{{ quiz }}</h1> -->
        <!-- <h1>quesList:{{ quesList }}</h1> -->
        <div class="inputArea1">
            <p>新增問題: </p>
            <textarea type="text" class="inputTextArea inputTextArea-center" v-model="ques.qu" @input="saveToSessionStorage" placeholder="請輸入問題">
            </textarea>
            <select v-model="ques.type" @input="saveToSessionStorage">
                <option value="" disabled selected>請選擇</option>
                <option value="單選" >單選題</option>
                <option value="多選" >多選題</option>
                <option value="選單" >選單題</option>
                <option value="詳述" >詳述題</option>
            </select>
            <input type="checkbox" id="mustCheck" v-model="ques.necessary" @input="saveToSessionStorage">
            <label for="mustCheck">必填</label>
        </div>  


        <div class="inputArea2" v-if="ques.type == '單選'">
            <div class="optionInput">
                <p>輸入選項:</p>
                <input type="text" v-model="optionTemp" @input="saveToSessionStorage" placeholder="請回答" @keyup.enter="pushToOption">
                <i class='bx bx-image-add'></i>
                <button @click="pushToOption" >新增選項</button>
            </div>
            <div class="optionItem" v-for="(item, index) in ques.options" :key="index" @mouseover="currentDeleteId=index" @mouseout="currentDeleteId=null">
                <i class="fa-regular fa-circle-dot" style="color: gray;"></i>
                <p>{{ item }}</p>
                <i class="fa-solid fa-x" @click="deleteOption(index)" v-show="currentDeleteId == index" ></i>
            </div>
        </div>
        
        <div class="inputArea2" v-if="ques.type == '多選'">
            <div class="optionInput">
                <p>輸入選項:</p>
                <input type="text" v-model="optionTemp"@input="saveToSessionStorage" placeholder="請回答" @keyup.enter="pushToOption">
                <button @click="pushToOption">新增選項</button>
            </div>
            <div class="optionItem" v-for="(item, index) in ques.options" :key="index" @mouseover="currentDeleteId=index" @mouseout="currentDeleteId=null">
                <i class="fa-regular fa-square-check" style="color: gray;"></i>
                <p>{{ item }}</p>
                <i class="fa-solid fa-x" @click="deleteOption(index)" v-show="currentDeleteId == index" style="color: blue;"></i>
            </div>
        </div>

        <div class="inputArea2" v-if="ques.type == '選單'">
            <div class="optionInput">
                <p>輸入選項:</p>
                <input type="text" v-model="optionTemp" @input="saveToSessionStorage" placeholder="請回答" @keyup.enter="pushToOption">
                <button @click="pushToOption">新增選項</button>
            </div>
            <div class="optionItem" v-for="(item, index) in ques.options" :key="index" @mouseover="currentDeleteId=index" @mouseout="currentDeleteId=null">
                <i class="fa-solid fa-circle" style="color: gray; font-size: 10px;"></i>
                <p>{{ item }}</p>
                <i class="fa-solid fa-x" @click="deleteOption(index)" v-show="currentDeleteId == index" style="color: blue;"></i>
            </div>
        </div>
        
        <div class="inputArea2" v-if="ques.type == '詳述'">
            <div class="littleArea">
                <p>(請詳述你的答案)</p>
                <textarea type="text" class="inputResize" v-model="ques.options" placeholder="核廢料(高雄中學); 金貝貝(高雄女中); 貂蟬(北一女)">
                </textarea>
            </div>
        </div>
        <div class="buttonArea" >
            <button type="button" v-on:click="pushToTable">
            {{isEditing ? '編輯完成' : '加入問題'}}</button>
        </div>

        <div class="inputArea3">
            <i class="fa-solid fa-trash" v-on:click="deleteSelected"></i>
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
                    <tr v-for="(item,index) in quesList" :key="item.id">
                        <th><input type="checkbox" v-model="selectedRows" :value="index"></th>
                        <th>{{ item.id }}</th>
                        <th>{{ item.qu }}</th>
                        <th>{{ item.type}}</th>
                        <th>{{ item.necessary ? '必填' : '非必填'}}</th>
                        <!-- <th>{{ mustCheckbox }}</th> -->
                        <th class = "tableEdit" v-on:click="editSelected(item, index)">編輯</th>
                    </tr>
                </tbody>
            </table>
            
        </div>


        <button v-on:click="previousPage">上一頁</button>
        <button v-on:click="nextPage" >預覽</button>
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
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 6px;
    box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);

    input,textarea{
        border-radius: 6px;
    }


    .inputArea1{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: left;

        p{
            font-size: 20px;
            font-weight: 700;
        }

        input,textarea{
            width: 300px;
            height:30px;
            margin-left: 20px;
            flex-wrap: wrap;
            background-color:#ffe3e3;
            color:#737373;
            border: 1px solid rgb(207, 111, 131);
            
            &:focus {
                outline: none; /* 移除默認的focus邊框 */
            }
            &:nth-child(0){
                width: 600px;

            }
        }
        select{
            margin-left: 20px;
        }

        #mustCheck{
            width: 15px;;
            margin-left: 20px;
            accent-color: #4CAF50;
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
        flex-direction: column;
        align-items: left;
        justify-content: left;

        .bx-image-add{
            font-size: 40px;
            color: rgb(128, 128, 128);
            cursor: pointer;
        }

        .optionInput{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: start;
        }

        .optionItem{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: start;
            margin-bottom: 20px;
            .fa-x{
                font-size: 25px;
                cursor: pointer;
                color: #e93030;
            }
            p{
                margin: 0 10px;
                width: 500px;
                height: 25px;
                position: relative;
                
                &:before{
                    content: '';
                    position: absolute;
                    background-color: gray;
                    width: 100%;
                    height: 0.5px;
                    left: 0;
                    bottom: 0;
                }
            }

        }
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
            font-size: 20px;
            font-weight: 700;
        }

        input,textarea{
            width: 150px;
            height:30px;
            margin-left: 20px;
            flex-wrap: wrap;
            background-color:#ffe3e3;
            color:#737373;
            border: 1px solid rgb(207, 111, 131);
            border-radius: 6px;
            outline: none;
            resize:none;

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
        button{
            float: left;
        }

    }

    .buttonArea{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: left;
        margin: 0;
        button{
            margin: 40px 0;
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
            color: black;
            cursor: pointer;
            &:hover{
                color: #5fa8d3;
            }
        }
        table{
            width: 100%;
            border-collapse: collapse; /* 確保邊框合併 */
            border-spacing: 0; /* 確保中間沒有空隙 */

            th, td{
                border: 1px solid black;
                padding: 8px;
            }
        .tableEdit{
            cursor:pointer;
            color:blue;
            &:hover{
                background-color:pink;
            }
            }
        }

    }


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
</style>