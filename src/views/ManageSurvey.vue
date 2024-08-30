<script>
import axios from 'axios'
import moment from 'moment';
import {useEditStore} from "@/stores/databaseEdit"

// test
export default{
    data(){
        return{
            search:{
                quizName: "",
                startDate:"",
                endDate:""
            },

            quizResList:[],
            subData:[],
            currentPage:1,
            selectedIds:[],
            dataTest:'嗨嗨',
            currentDeleteId: null,
            currentStateFilter:"",
            selectedRowIndex :[],
            databaseEdit: useEditStore().databaseEdit
        }
    },

    created() {
        this.fetchFirstData();
      
    },
    
    mounted(){
        this.loadCircleWorklet()
        if(this.$refs.options){
            this.$refs.options.style.visibility = 'hidden';
        }
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
  },
    methods:{

        goToDestination() {
            this.$router.push('/Questionnaire');
        },

        goToEditDestination(item, index){
            event.stopPropagation()
            this.$router.push({name:'Questionnaire', query:{formId:JSON.stringify(item)}});
            useEditStore().databaseEdit = true;
        },

        fetchFirstData() {
            axios.post('http://localhost:8080/quiz/search', {   
                        "quizName": "",
                        "startDate":"",
                        "endDate":""
                    })  
                .then(response => {
                    this.quizResList = response.data.quizResList
                    this.quizResList.forEach(quizRes=>{
                        quizRes.quesList.forEach(ques=>{
                            ques.options = ques.options.split(';')
                        })
                    })

                    this.subData = response.data.quizResList.slice(0,10)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);  // 錯誤處理
                });
        },
        
        fetchData() {
            axios.post('http://localhost:8080/quiz/search',{
                        "quizName": this.search.quizName,
                        "startDate":this.search.startDate,
                        "endDate":this.search.endDate
                    })  
                .then(response => {
                    this.quizResList = response.data.quizResList
                    this.quizResList.forEach(quizRes=>{
                        quizRes.quesList.forEach(ques=>{
                            ques.options = ques.options.split(';')
                        })
                    })

                    let start = (this.currentPage*10 -10)
                    let end = (this.currentPage*10)
                    this.subData = response.data.quizResList.slice(start,end);  // 將獲取的值給surveyData
                    if (this.subData.length == 0 && this.currentPage > 1) {
                        this.currentPage--;  
                        this.changeTab(this.currentPage);
                    }
                })
                .catch(error => {
                console.error('Error fetching data:', error);  // 錯誤處理
                });
        },

        deleteSelected(){
            axios.post("http://localhost:8080/quiz/delete", {
                "quizIdList":this.selectedRowIndex
            })
                .then(response =>{
                    this.selectedRowIndex = [];
                    this.fetchData();  // 重新抓取資料    
                })
                .catch(error => console.error("Error delete data", error));
            
        },

        deleteSingleButton(id, event){
            event.stopPropagation(); // 阻止事件冒泡
            axios.post("http://localhost:8080/quiz/delete", {
                "quizIdList":[id]
            })
                .then(response =>{
                    this.fetchData();  // 重新抓取資料      
                })
                .catch(error => console.error("Error delete data", error));

            this.animateButton(event)
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

        openOrClose(start_Date, end_Date, isPublished){
            let startDate = new Date(start_Date)
            let endDate = new Date(end_Date) 
            
            let mDate = moment().format("YYYY-MM-DD")
            let currentDate = new Date(mDate);
            // let year = now.getFullYear();       
            // let month = String(now.getMonth() + 1).padStart(2, '0');   
            // let day = String(now.getDate()).padStart(2, '0');
            // this.firstPage.startDate = `${year}-${month}-${day}`;
            if ((currentDate < startDate) && isPublished){
                return "未開放"
            }
            else if ((currentDate >= startDate) && (currentDate <= endDate) &&(isPublished)){
                return "進行中"
            }
            else if ((currentDate > endDate)&&(isPublished)){
                return "已結束"
            }
            else if (!isPublished){
                return "未發布"
            }
        },

        changeTab(index){
            let start = (index*10 -10)
            let end = (index*10)

            let subData = this.quizResList.slice(start, end)
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

      stateFilterChange(state){
        
        if (state == '未開放'){
            if (this.currentStateFilter != "未開放"){
                this.currentStateFilter = "未開放"
                let newSubData = this.quizResList.filter(item => {
                    return this.openOrClose(item.startDate, item.endDate, item.published) == "未開放";   
                })
                this.subData = newSubData.slice(0,10);
            }
            else{
                this.currentStateFilter = ""
                this.subData = this.quizResList.slice(0,10); 
            }
            
        }
        if (state == '進行中'){
            if (this.currentStateFilter != "進行中"){
                this.currentStateFilter = "進行中"
                let newSubData = this.quizResList.filter(item => {
                    return this.openOrClose(item.startDate, item.endDate, item.published) == "進行中";   
                })
                this.subData = newSubData.slice(0,10);
            }
            else{
                this.currentStateFilter = ""
                this.subData = this.quizResList.slice(0,10); 
            }
            
        }
        if (state == '已結束'){
            if (this.currentStateFilter != "已結束"){
                this.currentStateFilter = "已結束"
                let newSubData = this.quizResList.filter(item => {
                    return this.openOrClose(item.startDate, item.endDate, item.published) == "已結束";   
                })
                this.subData = newSubData.slice(0,10);
            }
            else{
                this.currentStateFilter = ""
                this.subData = this.quizResList.slice(0,10); 
            }
            
        }
        if (state == '未發布'){
            if (this.currentStateFilter != "未發布"){
                this.currentStateFilter = "未發布"
                let newSubData = this.quizResList.filter(item => {
                    return this.openOrClose(item.startDate, item.endDate, item.published) == "未發布";   
                })
                this.subData = newSubData.slice(0,10);
            }
            else{
                this.currentStateFilter = ""
                this.subData = this.quizResList.slice(0,10); 
            }
            
        }
      },

      sortItem(value){
        
        if (value == '編號( 小到大 )'){
            this.subData = this.subData.sort((a,b)=>{
                return a.id - b.id
            })
        }
        if (value == '編號( 大到小 )'){
            this.subData = this.subData.sort((a,b)=>{
                return b.id - a.id
            })
        }
        if (value == '開始日期( 最近 )'){
            this.subData = this.subData.sort((a,b)=>{
                return new Date(a.startDate) - new Date(b.startDate)
            })
        }
        if (value == '開始日期( 最遠 )'){
            this.subData = this.subData.sort((a,b)=>{
                return new Date(b.startDate) - new Date(a.startDate)
            })
        }
        if (value == '結束日期( 最近 )'){
            this.subData = this.subData.sort((a,b)=>{
                return new Date(a.endDate) - new Date(b.endDate)
            })
        }
        if (value == '結束日期( 最遠 )'){
            this.subData = this.subData.sort((a,b)=>{
                return new Date(b.endDate) - new Date(a.endDate)
            })
        }
        this.toggleSelectMenu()
        this.$refs.selectOptionText.textContent = value

      },

      toggleSelectMenu(){
        const content = this.$refs.options
        console.log(content.style.visibility)
        content.style.visibility = (content.style.visibility == 'hidden' ? 'visible' : 'hidden');

        const selectBtnBorder = this.$refs.selectBtnBorder;
        // const selectOptionText = selectBtnBorder.querySelector('span')
        if (content.style.visibility == 'visible'){
            // selectBtnBorder.style.background = '#f2f2f2'
            selectBtnBorder.style.background = 'rgba(0,0,0,0.7)'
            selectBtnBorder.style.color = 'white'
        }
        else{
            selectBtnBorder.style.background = 'white';
            selectBtnBorder.style.color = 'black';
        }
      },

      handleClickOutside(event){
        if (this.$refs.options){
            if (this.$refs.options.style.visibility == 'visible' 
            && !this.$refs.options.contains(event.target) 
            && !this.$refs.selectBtnBorder.contains(event.target)){

                this.$refs.options.style.visibility = 'hidden'
                this.$refs.selectBtnBorder.style.background = 'white';
                this.$refs.selectBtnBorder.style.color = 'black';
            }
        }
    },

      selectDeleteRow(id){
        const indexArray = this.selectedRowIndex.indexOf(id)
        if(indexArray > -1){
            this.selectedRowIndex.splice(indexArray, 1)
        }
        else{
            this.selectedRowIndex.push(id)
        }
      },
      canSelectRow(item) {
            const status = this.openOrClose(item.startDate, item.endDate, item.published);
            return status !== '進行中' && status !== '已結束';
        },
      goPublishOrCancel(item, event){
        let deepCopyItem = JSON.parse(JSON.stringify(item))
        deepCopyItem.quesList.forEach((item, index)=>{
            item.options = item.options.join(';')
        })
        event.stopPropagation()
        if (!deepCopyItem.published) {
            deepCopyItem.published = 1
            axios.post('http://localhost:8080/quiz/update', deepCopyItem)
                .then(response => {
                    alert(item.name + 'success publishe !!!!');
                    this.$router.go()
                })
                .catch(error => {
                    console.error('Failed to save data:', error);
                    alert(item.name + 'cannot publishe !!!!');
                    })
            }
        else{
            deepCopyItem.published = 0
            axios.post('http://localhost:8080/quiz/update', deepCopyItem)
                .then(response => {
                    alert(item.name + 'success cancel publishe !!!!');
                    this.$router.go()
                })
                .catch(error => {
                    console.error('Failed to save data:', error);
                    alert(item.name + 'cannot cancel publishe !!!!');
                    })
            }
    }
  },
  computed:{
        generateBottombar(){
            return Math.ceil(this.quizResList.length / 10);
        }
    }
}
</script>

<template>
    <!-- <h1>{{ currentStateFilter }}你好</h1> -->
    <div class="full">
        <div class="container">
            <!-- <h1>{{ data.pages }}</h1> -->
            <!-- <h1>{{ subData }}</h1> -->
            <!-- <h1>{{ selectedRowIndex }}</h1> -->
            <!-- <h1>是否編輯中:{{ databaseEdit }}</h1> -->
            <!-- <h1>{{ quizResList }}</h1> -->
            <!-- <h1>{{ subData[0] }}</h1> -->
            <!-- <h1>quizName {{ search.quizName }}</h1> -->
            <!-- <h1>startDate {{ search.startDate }}</h1> -->
            <!-- <h1>endDate {{ search.endDate }}</h1> -->
            <!-- <h1>selectedRowIndex{{ selectedRowIndex }}</h1> -->
             <!-- <h1>subData{{ subData[0] }}</h1> -->
            <div class="topContainer">
                <div class="content">
                    <div class="topCotent">
                        <p>問卷名稱: </p>
                        <input type="text" v-model="this.search.quizName">
                    </div>
                    <div class="bottomContent">
                        <p>統計時間: </p>
                        <input type="date" v-model="this.search.startDate">
                        <p id="to">到</p>
                        <input type="date" v-model="this.search.endDate">
                        <button @click="fetchData">搜尋</button>
                    </div>
                </div>
            </div>
            <div class="cdContainer">
                <div class="content">
                    <i class="fa-solid fa-trash" @click="deleteSelected"></i>
                    <i class="fa-solid fa-plus"  @click="goToDestination"></i>
                </div>    
                <div class="filter">
                    <p @click="stateFilterChange('未開放')" :class="{'before':currentStateFilter === '未開放'}">未開放</p>
                    <p @click="stateFilterChange('進行中')" :class="{'ing':currentStateFilter === '進行中'}">進行中</p>
                    <p @click="stateFilterChange('已結束')" :class="{'after':currentStateFilter === '已結束'}">已結束</p>
                    <p @click="stateFilterChange('未發布')" :class="{'after':currentStateFilter === '未發布'}">未發布</p>
                </div>    

                <div class="selectMenu">
                    <div class="selectBtn" ref="selectBtnBorder" @click="toggleSelectMenu">
                        <span ref="selectOptionText">Select option</span>
                        <i class="bx bx-chevron-down" :class="{'bx bx-chevron-up': toggleSelectMenu == true}"></i>
                    </div>

                    <ul ref="options" class="options">
                        <li class="option" @click="sortItem('編號( 小到大 )')">
                            <i class='bx bx-sort-up'></i>
                            <span class="option-text">編號( 小到大 )</span>
                        </li>
                        <li class="option" @click="sortItem('編號( 大到小 )')">
                            <i class='bx bx-sort-down' ></i>
                            <span class="option-text">編號( 大到小 )</span>
                        </li>
                        <li class="option" @click="sortItem('開始日期( 最近 )')">
                            <i class='bx bx-calendar'></i>
                            <span class="option-text">開始日期( 最近 )</span>
                        </li>
                        <li class="option" @click="sortItem('開始日期( 最遠 )')">
                            <i class='bx bx-calendar'></i>
                            <span class="option-text">開始日期( 最遠 )</span>
                        </li>
                        <li class="option" @click="sortItem('結束日期( 最近 )')">
                            <i class='bx bx-calendar'></i>
                            <span class="option-text">結束日期( 最近 )</span>
                        </li>
                        <li class="option" @click="sortItem('結束日期( 最遠 )')">
                            <i class='bx bx-calendar'></i>
                            <span class="option-text">結束日期( 最遠 )</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tableContainer" v-if="quizResList.length > 0">
                <div class="content">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>編號</th>
                                    <th>問卷名稱</th>
                                    <th>開放狀態</th>
                                    <th>開始時間</th>
                                    <th>結束時間</th>
                                    <th>編輯</th>
                                    <th>發布</th>
                                    <th>統計結果</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in subData" :key="item.id" 
                                @mouseover="currentDeleteId = item.id" @mouseout="currentDeleteId = null" 
                                :class="{ 'hovered': currentDeleteId == item.id, 'selected': selectedRowIndex.includes(item.id), 
                                    'disabled': !canSelectRow(item)}" 
                                    @click="canSelectRow(item) ? selectDeleteRow(item.id) : null">
                                    <td class="deleteId">
                                        <!-- <input type="checkbox" v-model="selectedIds" :value="item.firstPage.id"> -->
                                        <i class='bx bx-check' v-show="selectedRowIndex.includes(item.id)" ></i>
                                        <i class='bx bx-trash bx-tada' v-show="(currentDeleteId == item.id) && (canSelectRow(item))" @click="deleteSingleButton(item.id, $event)"></i>


                                    </td>
              
                                    <td class="id">{{ item.id}}</td>
                                    <td class="formName">{{ item.name}}</td>
                                    <td class="status">
                                        <span :class="{ 
                                        'before': openOrClose(item.startDate, item.endDate, item.published) == '未開放',
                                        'ing': openOrClose(item.startDate, item.endDate, item.published) == '進行中',
                                        'after': openOrClose(item.startDate, item.endDate, item.published) == '已結束', 
                                        'unpublished': openOrClose(item.startDate, item.endDate, item.published) == '未發布',}"
                                        >
                                        {{ openOrClose(item.startDate, item.endDate, item.published)}}
                                        </span>
                                    </td>
                                    <td class="startDate">{{ item.startDate }}</td>
                                    <td class="endDate">{{ item.endDate }}</td>

                                    <td class="goToEditDestination" @click="goToEditDestination(item, index)" v-if="openOrClose(item.startDate, item.endDate, item.published) != '進行中' && openOrClose(item.startDate, item.endDate, item.published) != '已結束'">編輯問卷
                                    </td>
                                    <td class="noGoToEditDestination" v-else>
                                        <img src="../assets/forbidGif.gif"></img>
                                    </td>
                                    
                                    
                                    <td class="goPublishOrCancel">
                                            <button class="publishButton" :class="{unPublishButton: item.published == true}" 
                                            @click="goPublishOrCancel(item, $event)" v-show="(openOrClose(item.startDate, item.endDate, item.published) != '進行中') &&
                                            (openOrClose(item.startDate, item.endDate, item.published) != '已結束')">
                                                {{ item.published? "取消發布":"去發布"}}</button>
                                    </td>
                                    <td>
                                        <RouterLink class="statistics" 
                                        :to="{path: '/QuestionStatistics', query: { formId:JSON.stringify(item)}}" 
                                        @click="useHeaderPageStore().currentHeaderPage = 'QuestionStatistics'">統計結果</RouterLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    <div class="bottomBar">
                        <i class="fa-regular fa-circle-left"></i>
                        <div class="numberBar">
                            <span v-for="index in generateBottombar" :key="index" @click="changeTab(index)" :class="{ active: currentPage === index }">
                                {{ index }}
                            </span>
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
$clr-unpublished: #e0e0e0;
$clr-unpublished-font: #4b4b4b;
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
    overflow-y: scroll;
    color: #212121;
    

    // --colors: #f94144, #f3722c, #f8961e, #f9844a, #f9c74f, #90be6d, #43aa8b, #4d908e, #577590, #277da1;
    // --min-radius: 20;
    // --max-radius: 100;
    // --num-circles: 30;
    // --min-opacity: 10;
    // --max-opacity: 50;
    // --seed: 42;
    // background-image: paint(circles);
    
    .container{
        width: 100%;
        height: 100%;
        padding: 5% 10%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
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
                        height: 30px;
                        font-size: 18px;
                        outline: none;
                        margin-left: 20px;
                        border: none;
                        border-radius: 12px;
                        padding: 0 10px;
                        box-shadow: 2px 2px 12px rgba(0,0,0,0.3), 10px 10px 8px rgba(0,0,0,0.2);
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
                        height: 25px;
                        font-size: 15px;
                        outline: none;
                        margin-left: 20px;
                        border: none;
                        border-radius: 12px;
                        padding: 10px;
                        box-shadow: 2px 2px 12px rgba(0,0,0,0.3), 10px 10px 8px rgba(0,0,0,0.2);
                    }
                    #to{
                        padding-left: 20px;
                    }
                    button{
                        width: 80px;
                        height: 40px;
                        font-size: 20px;
                        margin-left: 55px;
                        border-radius: 20px;
                        border: none;
                        border-bottom: 1px solid #aa6a21;
                        background: linear-gradient(90deg, #f8fca888, #f5c1858e);
                        color: #aa6a21;
                        box-shadow: 2px 2px 12px rgba(0,0,0,0.3), 10px 10px 8px rgba(0,0,0,0.2);
                        cursor: pointer;
                        &:active{
                            padding-top: 2px;
                            box-shadow: -1px 2px 12px rgba(0,0,0,0.3);
                        }
                    }
                }
            }
        
        }
        .cdContainer{
            width: 100%;
            height: 10%;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #f0ddcb;
            border-radius: 20px;
            margin: 5px 0;
            box-shadow: 2px 2px 12px rgba(0,0,0,0.3), 10px 10px 8px rgba(0,0,0,0.2);
            
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
                margin-left: 50px;
                p{
                    color:black;
                    border-radius: $radius;
                    font-size: 20px;
                    font-weight: 500;
                    text-align: center;
                    padding: 0.2rem 1rem;
                    margin: 0 2px;
                    cursor: pointer;
                    &:hover{
                        transition: all 0.2s ease-in;
                        box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);
                    }
                }
                :nth-child(1){
                    color: $clr-pending-font;
                    background-color: $clr-pending;
                    border-bottom: 4px solid $clr-pending-font;
                    box-shadow: 2px 2px 12px rgba(0,0,0,0.3), 10px 10px 8px rgba(0,0,0,0.2)
                }
                :nth-child(2){
                    color: $clr-paid-font;
                    background-color: $clr-paid;
                    border-bottom: 4px solid $clr-paid-font;
                    box-shadow: 2px 2px 12px rgba(0,0,0,0.3), 10px 10px 8px rgba(0,0,0,0.2)
                }
                :nth-child(3){
                    color: $clr-unpaid-font;
                    background-color: $clr-unpaid;
                    border-bottom: 4px solid $clr-unpaid-font;
                    box-shadow: 2px 2px 12px rgba(0,0,0,0.3), 10px 10px 8px rgba(0,0,0,0.2)
                }
                :nth-child(4){
                    color: $clr-unpublished-font;
                    background-color: $clr-unpublished;
                    border-bottom: 4px solid $clr-unpublished-font;
                    box-shadow: 2px 2px 12px rgba(0,0,0,0.3), 10px 10px 8px rgba(0,0,0,0.2)
                }

                @keyframes anim-shadow{
                    50% {
                        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), 10px 10px 8px rgba(0, 0, 0, 0.2); // 与静态样式一致
                    }
                }
                .before {
                    border-bottom: 1px solid $clr-pending-font;
                    box-shadow: -1px 2px 12px rgba(0,0,0,0.3);
                    margin-top: 10px;
                    animation:anim-shadow .5s forwards;
                }
                .ing {
                    border-bottom: 1px solid $clr-paid-font;
                    box-shadow: -1px 2px 12px rgba(0,0,0,0.3);
                    margin-top: 10px;
                    animation:anim-shadow .5s forwards;
                }
                .after {
                    border-bottom: 1px solid $clr-unpaid-font;
                    box-shadow: -1px 2px 12px rgba(0,0,0,0.3);
                    margin-top: 10px;
                    animation:anim-shadow .5s forwards;
                }
                .unpublished {
                    border-bottom: 1px solid $clr-unpublished-font;
                    box-shadow: -1px 2px 12px rgba(0,0,0,0.3);
                    margin-top: 10px;
                    animation:anim-shadow .5s forwards;
                }

            }
            .selectArea{
                select{
                    font-size: 15px;
                    border: none;
                    border-radius: 8px;
                    margin: 0 5px;
                    option{
                        border: none;
                    }
                }
            }
            .selectMenu{
                position: relative;

                .selectBtn{
                    width: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #fff;
                    border-radius: 8px;
                    cursor: pointer;
                    box-shadow: 0 0 5px rgba(0,0,0,0.1);
                    padding: 10px;
                    margin: 5px 0;
                }
                .options{
                    width: 200px;
                    position: absolute;
                    padding: 10px;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 3px rgba(0,0,0,0.1);
                    .option{
                        height: 30px;
                        margin:10px 0;
                        padding: 0 10px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        &:hover{
                            background: #f2f2f2;
                            border-radius: 8px;
                        }
                        i{
                            font-size: 25px;
                            margin: 0 10px 0 0;
                        }
                        span{
                            font-size: 16px;
                        }
                    }
                }
            }

        }
        .tableContainer{
            width: 100%;
            height: 70%;
            .content{
                table{
                    width: 100%;
                    // table-layout: fixed; 
                    border-collapse: collapse;
                    border-spacing: 0;
                    background-color: white;
                    box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);
                    .deleteId{
                        // display:flex;
                        // align-items:center;
                        // justify-content:flex-start;
                        margin-left:10px;
                        i{
                            cursor:pointer;
                            font-size:25px;
                            margin-left:20px;
                            border:1px solid black;
                            border-radius:8px;
                            box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);
                            &:hover{
                                color:red;
                                border:1px solid red;
                            }
                        }
                        
                    }

                    .status{
                        .before{
                            border-radius: $radius;
                            border-bottom: 1px solid $clr-pending-font;
                            padding: 0.2rem 1rem;
                            text-align: center;
                            background-color: $clr-pending;
                            color: $clr-pending-font;
                        }
                        .ing{
                            border-radius: $radius;
                            border-bottom: 1px solid $clr-paid-font;
                            padding: 0.2rem 1rem;
                            text-align: center;
                            background-color: $clr-paid;
                            color: $clr-paid-font;
                        }
                        .after{
                            border-radius: $radius;
                            border-bottom: 1px solid $clr-unpaid-font;
                            padding: 0.2rem 1rem;
                            text-align: center;
                            background-color: $clr-unpaid;
                            color: $clr-unpaid-font;
                        }
                        .unpublished{
                            border-radius: $radius;
                            border-bottom: 1px solid $clr-unpublished-font;
                            padding: 0.2rem 1rem;
                            text-align: center;
                            background-color: $clr-unpublished;
                            color: $clr-unpublished-font;
                        }
                    }
                    thead{
                        box-shadow: 0 5px 10px $clr-gray300;
                        // box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);
                    }
                    tr{
                        background-color: white;
                        border-radius: 12px;
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
                        padding: 10px 10px;
                        text-align: left;
                        letter-spacing: 0.1rem;
                        font-size: 20px;
                    }
                    td:first-child{
                        width: 120px;
                    }

                    .goToEditDestination {
                        text-align: center;
                        cursor: pointer;
                        color: rgba(25, 18, 238, 0.774); 
                    }
                    .noGoToEditDestination{
                        text-align: center;
                        img{
                            width: 30px;
                            height: 30px;
                        }
                    }
                    .goPublishOrCancel{
                        .publishButton{
                            width: 90px;
                            height: 40px;
                            font-size: 20px;
                            border-radius: 12px;
                            border: none;
                            border-bottom: 1px solid $clr-paid-font;
                            background-color: $clr-paid;
                            color: $clr-paid-font;
                            box-shadow: 2px 2px 12px rgba(0,0,0,0.3), 10px 10px 8px rgba(0,0,0,0.2);
                            cursor: pointer;
                            &:active{
                                padding-top: 2px;
                                box-shadow: -1px 2px 12px rgba(0,0,0,0.3);
                            }
                        }                    
                        .unPublishButton{
                            width: 90px;
                            height: 40px;
                            font-size: 20px;
                            border-radius: 12px;
                            border: none;
                            border-bottom: 1px solid $clr-unpaid-font;
                            background-color: $clr-unpaid;
                            color: $clr-unpaid-font;
                            box-shadow: 2px 2px 12px rgba(0,0,0,0.3), 10px 10px 8px rgba(0,0,0,0.2);
                            cursor: pointer;
                            &:active{
                                padding-top: 2px;
                                box-shadow: -1px 2px 12px rgba(0,0,0,0.3);
                            }
                        }                    
                    }

                    tr.hovered {
                        transition: all 0.2s ease-in;
                        box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);
                    }
                    tr.selected {
                        // background:  #c3c9ee; 
                        background:  #ced6fd; 
                        box-shadow: 2px 2px 12px rgba(0,0,0,0.5), -1px -1px 8px rgba(0,0,0,0.2);
                        // border-bottom: 2px solid rgba(0, 0, 255, 0.54);
                    }
                    .statistics{
                        text-decoration: none;
                        cursor:point;
                        color: rgba(25, 18, 238, 0.774); 
                    }

                    
                }
            }

        }

        .bottomBar{
            width: 100%;
            height: 5%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 30px 0;
            .numberBar{
                display: flex;
                .active {
                    border-radius: 10px;
                    background-color: #795334;
                    color: white;
                }
                span{          
                    display: block; // 为了让内容居中
                    align-items: center;
                    justify-content: center;
                    width: 40px ; 
                    height: 40px ; 
                    font-size: 30px;
                    cursor: pointer;
                    transition: 0.3s;
                    text-align: center;
                    line-height: 40px;
                    color: black;
                    
                    &:hover{
                        border-radius: 10px;
                        background: #7953347d;
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


