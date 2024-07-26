<script>
export default{
    data(){
        return{
            secondPage:{
                id: '',
                formQuestion:'',
                formSingleOrMulti:'',
                formMustCheckbox:false,
                formOption:'',
            },
            inputDataAll:null,

            tableData:[],
            
            selectedRows:[],

            isEditing:false
        }
    },
    computed:{
        
    },
    methods:{
        previousPage(){
            sessionStorage.setItem("inputDataContent", JSON.stringify(this.secondPage))
            sessionStorage.setItem("inputDataAll", JSON.stringify(this.secondPage))
            sessionStorage.setItem("tableData", JSON.stringify(this.tableData))
            
            this.$emit("changeView", 'QuestionTitle')
        },
        nextPage(){
            sessionStorage.setItem("inputDataContent", JSON.stringify(this.secondPage))
            sessionStorage.setItem("inputDataAll", JSON.stringify(this.secondPage))
            sessionStorage.setItem("tableData", JSON.stringify(this.tableData))

            this.$emit("changeView", 'QuestionCheck')
        },
        pushToTable(){
            if (!this.isEditing){
                let length = this.tableData.length
                this.secondPage['id'] = length+1
                let deepCopy = JSON.parse(JSON.stringify(this.secondPage));
                this.tableData.push(deepCopy)
                
                this.secondPage = {
                    formQuestion: '',
                    formSingleOrMulti: '',
                    formMustCheckbox: false,
                    formOption: '',
                    };
                }     
            else{
                let index = this.tableData.findIndex(item => item.id === this.secondPage.id)
                console.log(index)
                if (index !== -1){
                this.tableData.splice(index, 1, JSON.parse(JSON.stringify(this.secondPage)))
            }
                this.isEditing = false;

                this.secondPage = {
                    id: '',
                    formQuestion: '',
                    formSingleOrMulti: '',
                    formMustCheckbox: false,
                    formOption: '',
                    };

            }              
        },
        clearTableSession() {
            // 清空 sessionStorage
            sessionStorage.removeItem('tableData');
        },
        
        deleteSelected(){
            // 删除选中的行
            this.tableData = this.tableData.filter((item, index) => !this.selectedRows.includes(index));
            // 清空已选中的项
            this.selectedRows = [];  
            
            this.tableData.forEach(function(item, index){
                item.id = index+1
            })
        },

        editSelected(item,index){
            this.secondPage = {
                id:item.id,
                formQuestion: item.formQuestion,
                formSingleOrMulti: item.formSingleOrMulti,
                formMustCheckbox: item.formMustCheckbox,
                formOption: item.formOption,
            },
            this.isEditing = true
        }
    },


    created(){
        let savedContent = sessionStorage.getItem('inputDataContent')
        if (savedContent){
            this.secondPage = JSON.parse(savedContent)
        }

        let tableData = sessionStorage.getItem("tableData")
        if (tableData){
            this.tableData = JSON.parse(tableData)
        }

        window.addEventListener('beforeunload', this.clearTableSession);


    }
}
</script>

<template>
    <div class="maxArea">

        <div class="inputArea1">
            <p>問題: </p>
            <input type="text"  v-model="secondPage.formQuestion" placeholder="請輸入問題">
            <select v-model="secondPage.formSingleOrMulti">
                <option value="單選" >單選題</option>
                <option value="多選" >多選題</option>
            </select>
            <!-- <h1>{{ tableData }}</h1> -->
            <input type="checkbox" id = "mustCheck" v-model="secondPage.formMustCheckbox">
            <label for="mustCheck">必填</label>
            <!-- <h1>{{this.isEditing}}</h1>
            <h1>{{this.secondPage}}</h1>            
            <h1>{{this.tableData}}</h1> -->
        </div>  

        <div class="inputArea2" >
            <p>選項: </p>
            <div class="littleArea">
                <p>(多個答案請以; 分隔)</p>
                <input type="text" class="inputResize" v-model="secondPage.formOption" placeholder="核廢料(高雄中學); 金貝貝(高雄女中); 貂蟬(北一女)">
                <button type="button" class="addButton" v-on:click="pushToTable">{{isEditing ? '編輯完成' : '加入'}}</button>
            </div>
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
                    <tr v-for="(item,index) in tableData" :key="item.id">
                        <th><input type="checkbox" v-model="selectedRows" :value="index"></th>
                        <th>{{ item.id }}</th>
                        <th>{{ item.formQuestion }}</th>
                        <th>{{ item.formSingleOrMulti}}</th>
                        <th>{{ item.formMustCheckbox ? '必填' : '非必填'}}</th>
                        <!-- <th>{{ mustCheckbox }}</th> -->
                        <th class = "tableEdit" v-on:click="editSelected(item, index)">編輯</th>
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
            color: black;
            cursor: pointer;
            &:hover{
                color: #5fa8d3;
            }
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