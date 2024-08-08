<script>
// import database from "../assets/database.json"
import axios from 'axios'
import moment from 'moment';
import {useEditStore} from "@/stores/databaseEdit"


export default{
    data(){
        return{
            data:null,
            subData:null,
            currentPage:1,
            selectedIds:[],
            dataTest:'嗨嗨',
            databaseEdit:useEditStore().databaseEdit,
        }
    },
    created() {
        // this.data = database
        this.fetchData();
        // this.subData = this.data.pages.slice(0,10)
        
    },
    methods:{
        goToDestination() {
            this.$router.push('/Questionnaire');
        },
        goToEditDestination(item, index){
            this.$router.push({name:'Questionnaire', query:{formId:JSON.stringify(item)}});
            useEditStore().databaseEdit = true;
        },
        
        fetchData() {
            axios.get('../src/assets/database.json')  // 替換為實際URL或是路徑
                .then(response => {
                    this.data = response.data  // 將獲取的值給surveyData
                    this.subData = response.data.pages.slice(0,10);  // 將獲取的值給surveyData

                })
                .catch(error => {
                console.error('Error fetching data:', error);  // 錯誤處理
                });
        },
        
        deleteSelected(){
            axios.post("http://localhost:3000/delete", {ids: this.selectedIds})
                .then(response =>{
                    // this.fetchDeleteData();
                    this.selectedIds = []
                })
                .catch(error => console.error("Error delete data", error));
        },
        
        fetchDeleteData() {
            axios.get("/api/delete")
                .then(response => this.data = response.data)
                .catch(error => console.error('Error fetching data:', error));
        },
        testSaveFunction(){
            sessionStorage.setItem("testTable", JSON.stringify(sytthis.dataTest))
        },
        testLoadFunction(){
            let data = sessionStorage.setItem("testTable", this.dataTest)
            if (data){

            }
        },
        openOrClose(start_Date, end_Date){
  

            let startDate = new Date(start_Date)
            let endDate = new Date(end_Date) 
            
            let mDate = moment().format("YYYY-MM-DD")
            let currentDate = new Date(mDate);


            // let year = now.getFullYear();       
            // let month = String(now.getMonth() + 1).padStart(2, '0');   
            // let day = String(now.getDate()).padStart(2, '0');
            // this.firstPage.startDate = `${year}-${month}-${day}`;

            if (currentDate < startDate){
                return "未開放"
            }
            else if ((currentDate >= startDate) && (currentDate <= endDate)){
                return "進行中"
            }
            
            else if (currentDate > endDate){
                return "結束"
            }
             
        },
        changeTab(index){
            let start = (index*10 -10)
            let end = (index*10)

            let subData = this.data.pages.slice(start, end)
            this.subData = subData     
            this.currentPage = index    
        }

    
    },
    computed:{
        bottombar(){
            let number = Math.ceil((this.data.pages.length)/10)
            return number
        }
    }
}
</script>

<template>
    <!-- <h1>{{ databaseEdit }}</h1> -->
    <!-- <button type="button" style="font-size:50px ;" v-on="testFunction">測試</button> -->

    <div class="full">
        <div class="container">
            <div class="topContainer">
                <div class="content">
                    <div class="topCotent">
                        <p>問卷名稱: </p>
                        <input type="text">
                    </div>
                    <div class="bottomContent">
                        <p>統計時間: </p>
                        <input type="date">
                        <p id="to">到</p>
                        <input type="date">
                        <button>搜尋</button>
                    </div>
                </div>
            </div>

            <div class="cdContainer">
                <div class="content">
                    <i class="fa-solid fa-trash" @click="deleteSelected"></i>
                    <i class="fa-solid fa-plus"  @click="goToDestination"></i>
                </div>    
            </div>
            <div class="tableContainer">
                <div class="content">
                    <h1>{{ selectedIds }}</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>勾選</th>
                                    <th>編號</th>
                                    <th>名稱</th>
                                    <th>狀態</th>
                                    <th>開始時間</th>
                                    <th>結束時間</th>
                                    <th>結果</th>
                                </tr>
                            </thead>
                            <tbody v-for="(item, index) in subData" :key="index" >
                                <tr>
                                    <td><input type="checkbox" v-model="selectedIds" :value="item.firstPage.id"></td>
                                    <td>{{ item.firstPage.id}}</td>
                                    <td>{{ item.firstPage.formName}}</td>
                                    <td>{{ openOrClose(item.firstPage.startDate, item.firstPage.endDate)}}</td>
                                    <!-- <td>{{ item.firstPage.formDescribe}}</td> -->
                                    <td>{{ item.firstPage.startDate }}</td>
                                    <td>{{ item.firstPage.endDate }}</td>
                                    <td @click="goToEditDestination(item, index)">編輯問卷</td>
                                    <!-- <h1>{{ item }}</h1> -->
                                </tr>
                            </tbody>
                        </table>
                    <div class="bottomBar">
                        <i class="fa-regular fa-circle-left"></i>
                        <div class="numberBar">
                            <span v-for="index in bottombar" :key="index" @click="this.changeTab(index)" :class="{ active: currentPage === index }">{{ index }}</span>
                        </div>
                        <i class="fa-regular fa-circle-right"></i>
                    </div>

                </div>
            </div>
            <!-- <h1>{{ subData }}</h1> -->
            <div class="bottomContainer"></div>
        </div>
    </div>

<!-- <RouterLink class = "Questionnaire"  to="/Questionnaire">新增問卷</RouterLink> -->

</template>

<style scoped lang="scss">

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Zen Kaku Gothic New", sans-serif;
}

.full{
    width: 100dvw;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .container{
        width: 60%;
        height: 100%;

        .topContainer{
            width: 100%;
            height: 20%;
            background-color: #f2ede7;
            .content{
                padding: 4%;
                .topCotent{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    input{
                        width: 60%;
                        margin-left: 20px;
                        outline: none;
                    }
                }
                .bottomContent{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    margin-top: 20px;
                    input{
                        width: 20%;
                        outline: none;
                        margin-left: 20px;

                    }
                    #to{
                        padding-left: 20px;
                    }
                    button{
                        width: 60px;
                        height: 30px;
                        font-size: 15px;
                        margin-left: 55px;
                    }


                }
            }
        
        }
        .cdContainer{
            width: 100%;
            height: 10%;
            background-color: #f0dfcc;
            .content{
                padding: 20px;
                .fa-solid{
                    margin-left: 15px;
                    font-size: 30px;
                    font-weight: 800;
                    cursor: pointer;
                }
            }

        }
        .tableContainer{
            width: 100%;
            height: 80%;
            background-color: #b68766;
            .content{
                padding: 4%;
                table{
                    width: 100%;
                    border-collapse: collapse; /* 邊框合併 */
                    border-spacing: 0; /* 中間沒有空隙 */
                    th, td{
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }
                    td:last-child{
                        cursor: pointer;
                        color: rgb(53, 2, 134);
                        
                    }
                    
                }
            }

        }
        .bottomContainer{
            width: 100%;
            height: 5%;
            background-color: #795334;

        }
        .bottomBar{
            width: 100%;
            height: 5%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 40px 0 ;
            .numberBar{
                .active {
                    background-color: #795334;
                    color: white;
                }
                span{
                    text-align: center;    /* 确保文本居中 */
                    vertical-align: middle; /* 垂直居中，如果在行内显示 */
                    margin: 0 5px;
                    font-size: 30px;
                    cursor: pointer;
                    transition: 0.3s;
                    text-align: center;
                    color: black;
                    
                    &:hover{
                        transform: scale(1.2);
                        transition: 0.3s;
                    }
                }
            }
            .fa-regular{
                font-size: 30px;
                cursor: pointer;
                &:hover{
                        transform: scale(1.2);
                        transition: 0.3s;
                    }
            }
        }
    }
}
</style>


