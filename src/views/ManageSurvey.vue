<script>
// import database from "../assets/database.json"
import axios from 'axios'
import moment from 'moment';
import {useEditStore} from "@/stores/databaseEdit"


export default{
    data(){
        return{
            data:{"pages":[]},
            subData:[],
            currentPage:1,
            selectedIds:[],
            dataTest:'嗨嗨',
            databaseEdit:useEditStore().databaseEdit,
            currentDeleteId: null,
            currenStateFilter:""
        }
    },
    async created() {
        await this.fetchFirstData();
      
    },
    mounted(){
        this.loadCircleWorklet()
    },
    methods:{
        goToDestination() {
            this.$router.push('/Questionnaire');
        },
        goToEditDestination(item, index){
            this.$router.push({name:'Questionnaire', query:{formId:JSON.stringify(item)}});
            useEditStore().databaseEdit = true;
        },

        fetchFirstData() {
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
                    this.selectedIds = [];
                    this.fetchData();  // 重新抓取資料    
                })
                .catch(error => console.error("Error delete data", error));
            
        },

        deleteSingleButton(id){
            axios.post("http://localhost:3000/deleteSingle", {ids: id})
                .then(response =>{
                    this.fetchData();  // 重新抓取資料      
                })
                .catch(error => console.error("Error delete data", error));

            this.animateButton(event)
        },

        fetchData() {
            axios.get('../src/assets/database.json')  // 替換為實際URL或是路徑
                .then(response => {
                    this.data = response.data  // 將獲取的值給surveyData
                    let start = (this.currentPage*10 -10)
                    let end = (this.currentPage*10)
                    this.subData = response.data.pages.slice(start,end);  // 將獲取的值給surveyData
                    if (this.subData.length == 0 && this.currentPage > 1) {
                        this.currentPage--;  
                        this.changeTab(this.currentPage);
                }
                })
                .catch(error => {
                console.error('Error fetching data:', error);  // 錯誤處理
                });
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
        },

        animateButton(event){
            const target = event.target;
            target.classList.remove('animate');

            // Force reflow to restart animation
            void target.offsetWidth;

            target.classList.add('animate');
            setTimeout(() => {
                target.classList.remove('animate');
            }, 700);
        },
        
      async loadCircleWorklet() {
        // 检查浏览器是否支持 Paint Worklet
        if ('paintWorklet' in CSS) {
          // 加载 fleck 的 Paint Worklet
          CSS.paintWorklet.addModule('https://unpkg.com/css-houdini-circles/dist/circles.js');
        } else {
          console.error('Your browser does not support Paint Worklet.');
        }
      },
      currenStateFilter(state){
        if (state == "未開放"){
            this.currenStateFilter = "未開放";
            this.subData
        }
        if (state == "開放中"){
            this.currenStateFilter = "開放中";
        }
        if (state == "結束"){
            this.currenStateFilter = "結束";
        }
      },
    
    },
    computed:{
        bottombar(){
            let number = Math.ceil((this.data.pages.length)/10);
            return number
        },
    }
}
</script>

<template>
    <!-- <h1>{{ data}}</h1> -->
    <!-- <h1>{{ subData[0] }}</h1> -->
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
                <div class="filter">
                    <p @click="currenStateFilter('未開放')">未開放</p>
                    <p @click="currenStateFilter('進行中')">進行中</p>
                    <p @click="currenStateFilter('結束')">結束</p>
                </div>    
                <div class="selectArea">
                    <select name="" id="">
                        <option value="id">依照編號</option>
                        <option value="dateAsc">依照日期 近到遠</option>
                        <option value="dateDesc">依照日期 遠到近</option>
                    </select>
                </div>
            </div>
            <div class="tableContainer">
                <div class="content">
                        <table>
                            <thead>
                                <tr>
                                    <th>勾選</th>
                                    <th>編號</th>
                                    <th>問卷名稱</th>
                                    <th>開放狀態</th>
                                    <th>開始時間</th>
                                    <th>結束時間</th>
                                    <th>編輯</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in subData" :key="index" 
                                @mouseover="currentDeleteId = index" @mouseout="currentDeleteId = null" :class="{ 'hovered': currentDeleteId == index }">
                                    <td class="deleteTd">
                                        <input type="checkbox" v-model="selectedIds" :value="item.firstPage.id">
                                        <button class = "bubbly-button" type="button"  v-show="currentDeleteId == index" @click="deleteSingleButton(String(item.firstPage.id))">刪除</button>
                                    </td>
              
                                    <td class="id">{{ item.firstPage.id}}</td>
                                    <td class="formName">{{ item.firstPage.formName}}</td>
                                    <td class="status">
                                        <span :class="{ 
                                        'before': openOrClose(item.firstPage.startDate, item.firstPage.endDate) == '未開放',
                                        'ing': openOrClose(item.firstPage.startDate, item.firstPage.endDate) == '進行中',
                                        'after': openOrClose(item.firstPage.startDate, item.firstPage.endDate) == '結束', }"
                                        >
                                        {{ openOrClose(item.firstPage.startDate, item.firstPage.endDate)}}
                                        </span>
                                    </td>
                                    <!-- <td>{{ item.firstPage.formDescribe}}</td> -->
                                    <td class="startDate">{{ item.firstPage.startDate }}</td>
                                    <td class="endDate">{{ item.firstPage.endDate }}</td>
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
            <!-- <div class="bottomContainer"></div> -->
        </div>
    </div>

<!-- <RouterLink class = "Questionnaire"  to="/Questionnaire">新增問卷</RouterLink> -->

</template>

<style scoped lang="scss">

/*   color variables */
$clr-primary: #81d4fa;
$clr-primary-light: #e1f5fe;
$clr-primary-dark: #4fc3f7;
$clr-gray100: #f9fbff;
$clr-gray150: #f4f6fb;
$clr-gray200: #eef1f6;
$clr-gray300: #e1e5ee;
$clr-gray400: #767b91;
$clr-gray500: #4f546c;
$clr-gray600: #2a324b;
$clr-gray700: #161d34;
$clr-pending: #fff0c2;
$clr-pending-font: #a68b00;
$clr-unpaid: #ffcdd2;
$clr-unpaid-font: #c62828;
$clr-paid: #c8e6c9;
$clr-paid-font: #388e3c;
$clr-link: #2962ff;

/*   border radius */
$radius: 12px;

$fuschia: #ff0081;
$button-bg: $fuschia;
$button-text-color: #fff;
$baby-blue: #f8faff;

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Zen Kaku Gothic New", sans-serif;
}

.full{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #212121;
    

    --colors: #f94144, #f3722c, #f8961e, #f9844a, #f9c74f, #90be6d, #43aa8b, #4d908e, #577590, #277da1;
    --min-radius: 20;
    --max-radius: 100;
    --num-circles: 30;
    --min-opacity: 10;
    --max-opacity: 50;
    --seed: 42;
    background-image: paint(circles);
    
    .container{
        width: 100%;
        height: 100%;
        padding: 5% 10%;

        .topContainer{
            width: 100%;
            height: 20%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            background-color: #f2ede7;
            border-radius: 20px;
            margin-bottom: 20px;
            padding: 2%;
            .content{
                width: 100%;
                // display: flex;
                // flex-direction: column;
                // align-items: flex-start;  // 确保内容在垂直方向上对齐
                // justify-content: space-evenly;  // 垂直居中对齐
                p{
                    font-size: 20px;
                }
                .topCotent{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    margin: 10px 0;

                    input{
                        width: 60%;
                        outline: none;
                        margin-left: 20px;
                    }
                }
                .bottomContent{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    margin: 10px 0;
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
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #f0dfcc;
            padding: 0 10px;
            
            .content{
                padding: 20px;
                .fa-solid{
                    margin-left: 15px;
                    font-size: 30px;
                    font-weight: 800;
                    cursor: pointer;
                }
            }
            .filter{
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 500px;
                p{
                    color:black;
                    border-radius: $radius;
                    font-size: 20px;
                    font-weight: 500;
                    text-align: center;
                    padding: 0.2rem 1rem;
                    margin: 0 5px;
                    cursor: pointer;
                    &:hover{
                        transition: all 0.2s ease-in;
                        transform:scale(1.1);
                        box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);
                    }
                }
                p:nth-child(1){
                    background-color: $clr-pending;
                    color: $clr-pending-font;
                    box-shadow: 2px 2px 12px rgba(0,0,0,0.2), 10px 10px 8px rgba(0,0,0,0.2);

                }
                p:nth-child(2){
                    background-color: $clr-paid;
                    color: $clr-paid-font;
                    box-shadow: 2px 2px 12px rgba(0,0,0,0.2), 10px 10px 8px rgba(0,0,0,0.2);

                }
                p:nth-child(3){
                    background-color: $clr-unpaid;
                    color: $clr-unpaid-font;
                    box-shadow: 2px 2px 12px rgba(0,0,0,0.2), 10px 10px 8px rgba(0,0,0,0.2);

                }

            }
            .selectArea{
                select{
                    font-size: 15px;
                }
            }

        }
        .tableContainer{
            width: 100%;
            height: 70%;
            .content{
                // padding: 4%;
                table{
                    width: 100%;
                    table-layout: fixed; /* 固定表格布局 */
                    border-collapse: collapse; /* 邊框合併 */
                    border-spacing: 0; /* 中間沒有空隙 */
                    background-color: white;
                    box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);
                    // box-shadow: 0 5px 10px $clr-gray300;

                    .status{
                        .before{
                            border-radius: $radius;
                            padding: 0.2rem 1rem;
                            text-align: center;
                            background-color: $clr-pending;
                            color: $clr-pending-font;
                        }
                        .ing{
                            border-radius: $radius;
                            padding: 0.2rem 1rem;
                            text-align: center;
                            background-color: $clr-paid;
                            color: $clr-paid-font;
                        }
                        .after{
                            border-radius: $radius;
                            padding: 0.2rem 1rem;
                            text-align: center;
                            background-color: $clr-unpaid;
                            color: $clr-unpaid-font;
                        }
                    }
                    thead{
                        box-shadow: 0 5px 10px $clr-gray300;
                    }
                    tr{
                        background-color: white;


                    }
                    tr:nth-child(even) {
                        background-color: $clr-gray200;
                    }

                    th{
                        padding: 10px 10px;
                        text-align: left;
                        letter-spacing: 0.1rem;
                        font-weight: 900;
                        font-size: 20px;
                        background-color: $clr-gray300;
                        
                    } 
                      
                    td{
                        // border: 1px solid black;
                        padding: 10px 10px;
                        text-align: left;
                        letter-spacing: 0.1rem;
                        font-size: 20px;
                    }

                    td:last-child{
                        cursor: pointer;
                        color: rgba(25, 18, 238, 0.774); 
                    }

                    tr.hovered {
                        transform: scale(1.02);
                        // transform: scale3d(1.02, 1.02, 10);
                        transition: all 0.2s ease-in;
                        box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);

                    }
                    .bubbly-button{
                        font-family: 'Helvetica', 'Arial', sans-serif;
                        display: inline-block;
                        font-size: 14px;
                        padding: 1em 2em;
                        background-color: $button-bg;
                        color: $button-text-color;
                        border: none;
                        border-radius: 12px;
                        cursor: pointer;
                        position: relative;
                        transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
                        box-shadow: 0 2px 25px rgba(255, 0, 130, 0.5);
                        
                        &:focus {
                            outline: 0;
                        }
                        
                        &:before, &:after{
                            position: absolute;
                            content: '';
                            display: block;
                            width: 140%;
                            height: 100%;
                            left: -20%;
                            z-index: -1000;
                            transition: all ease-in-out 0.5s;
                            background-repeat: no-repeat;
                        }
                        
                        &:before{
                            display: none;
                            top: -75%;
                            background-image:  
                            radial-gradient(circle, $button-bg 20%, transparent 20%),
                            radial-gradient(circle,  transparent 20%, $button-bg 20%, transparent 30%),
                            radial-gradient(circle, $button-bg 20%, transparent 20%), 
                            radial-gradient(circle, $button-bg 20%, transparent 20%),
                            radial-gradient(circle,  transparent 10%, $button-bg 15%, transparent 20%),
                            radial-gradient(circle, $button-bg 20%, transparent 20%),
                            radial-gradient(circle, $button-bg 20%, transparent 20%),
                            radial-gradient(circle, $button-bg 20%, transparent 20%),
                            radial-gradient(circle, $button-bg 20%, transparent 20%);
                        background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
                        //background-position: 0% 80%, -5% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 85% 30%;
                        }
                        
                        &:after{
                            display: none;
                            bottom: -75%;
                            background-image:  
                            radial-gradient(circle, $button-bg 20%, transparent 20%), 
                            radial-gradient(circle, $button-bg 20%, transparent 20%),
                            radial-gradient(circle,  transparent 10%, $button-bg 15%, transparent 20%),
                            radial-gradient(circle, $button-bg 20%, transparent 20%),
                            radial-gradient(circle, $button-bg 20%, transparent 20%),
                            radial-gradient(circle, $button-bg 20%, transparent 20%),
                            radial-gradient(circle, $button-bg 20%, transparent 20%);
                        background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
                        //background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
                        }
                        
                        &:active{
                            transform: scale(0.9);
                            background-color: darken($button-bg, 5%);
                            box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
                        }
                        
                        &.animate{
                            &:before{
                            display: block;
                            animation: topBubbles ease-in-out 0.75s forwards;
                            }
                            &:after{
                            display: block;
                            animation: bottomBubbles ease-in-out 0.75s forwards;
                            }
                        }
                        }
                        @keyframes topBubbles {
                        0%{
                            background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
                        }
                            50% {
                            background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;}
                        100% {
                            background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
                        background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
                        }
                        }
                        @keyframes bottomBubbles {
                        0%{
                            background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
                        }
                        50% {
                            background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;}
                        100% {
                            background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
                        background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
                        }    
                    }
                    
                }
            }

        }
        // .bottomContainer{
        //     width: 100%;
        //     height: 5%;
        //     background-color: #795334;

        // }
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


